import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export type OpenGraph = {
  url: string;
  title: string;
  description: string;
  image: string | null;
};

export class OpenGraphError extends Error {}
/** 내부망 주소 등 아예 접근하면 안 되는 주소 */
export class BlockedUrlError extends OpenGraphError {}

const TIMEOUT_MS = 5000;
const MAX_BYTES = 1024 * 1024; // <head>만 필요하므로 1MB까지만 읽는다
const MAX_REDIRECTS = 3;

/** http(s) URL 문자열을 검증해 URL 객체로 돌려준다. */
export function parseHttpUrl(input: string): URL | null {
  try {
    const url = new URL(input.trim());
    return url.protocol === "http:" || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

/** 주어진 페이지의 오픈 그래프 정보(제목·설명·썸네일·주소)를 추출한다. */
export async function fetchOpenGraph(input: string): Promise<OpenGraph> {
  let url = parseHttpUrl(input);
  if (!url) throw new OpenGraphError("http:// 또는 https:// 로 시작하는 주소가 아니에요.");

  // 리다이렉트를 직접 따라가며 매번 대상 주소를 검사한다 (내부망 우회 방지).
  let res: Response | undefined;
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    await assertPublicHost(url.hostname);
    res = await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    const location = res.headers.get("location");
    if (res.status >= 300 && res.status < 400 && location) {
      const next = parseHttpUrl(new URL(location, url).href);
      if (!next) throw new OpenGraphError("잘못된 리다이렉트 주소예요.");
      url = next;
      continue;
    }
    break;
  }
  if (!res || (res.status >= 300 && res.status < 400)) {
    throw new OpenGraphError("리다이렉트가 너무 많아요.");
  }
  if (!res.ok) throw new OpenGraphError(`페이지를 불러오지 못했어요. (HTTP ${res.status})`);

  const contentType = res.headers.get("content-type") ?? "";
  if (contentType && !/text\/html|application\/xhtml\+xml/i.test(contentType)) {
    throw new OpenGraphError("HTML 페이지가 아니에요.");
  }

  const html = await readHead(res, contentType);
  return extractOpenGraph(html, url);
}

/** 응답 본문을 최대 MAX_BYTES까지, </head>가 나오면 그 지점까지만 읽어 문자열로 디코딩한다. */
async function readHead(res: Response, contentType: string): Promise<string> {
  const chunks: Uint8Array[] = [];
  let size = 0;
  const reader = res.body?.getReader();
  if (reader) {
    const latin1 = new TextDecoder("latin1");
    while (size < MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      size += value.byteLength;
      if (/<\/head>/i.test(latin1.decode(value))) break;
    }
    await reader.cancel().catch(() => {});
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  // 한국 사이트는 EUC-KR 인 경우가 있어 헤더 → <meta charset> 순으로 문자셋을 찾는다.
  const sniff = new TextDecoder("latin1").decode(bytes.subarray(0, 4096));
  const charset =
    /charset=["']?([\w-]+)/i.exec(contentType)?.[1] ??
    /<meta[^>]+charset=["']?([\w-]+)/i.exec(sniff)?.[1] ??
    "utf-8";
  try {
    return new TextDecoder(charset).decode(bytes);
  } catch {
    return new TextDecoder("utf-8").decode(bytes);
  }
}

function extractOpenGraph(html: string, pageUrl: URL): OpenGraph {
  const meta = new Map<string, string>();
  for (const [tag] of html.matchAll(/<meta\b[^>]*>/gi)) {
    const key = attr(tag, "property") ?? attr(tag, "name");
    const content = attr(tag, "content");
    if (key && content && !meta.has(key.toLowerCase())) meta.set(key.toLowerCase(), content);
  }
  const titleTag = /<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1];

  const pick = (...keys: string[]) => {
    for (const key of keys) {
      const value = meta.get(key);
      if (value?.trim()) return clean(value);
    }
    return null;
  };

  const ogUrl = pick("og:url");
  const url = (ogUrl && parseHttpUrl(new URL(ogUrl, pageUrl).href)?.href) || pageUrl.href;
  const image = pick("og:image:secure_url", "og:image", "og:image:url", "twitter:image");

  return {
    url,
    title:
      pick("og:title", "twitter:title") ||
      (titleTag ? clean(titleTag) : "") ||
      pageUrl.hostname.replace(/^www\./, ""),
    description: pick("og:description", "twitter:description", "description") ?? "",
    image: image ? (parseHttpUrl(new URL(image, pageUrl).href)?.href ?? null) : null,
  };
}

function attr(tag: string, name: string) {
  const match = new RegExp(`\\b${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, "i").exec(tag);
  return match ? (match[1] ?? match[2] ?? match[3]) : null;
}

function clean(value: string) {
  return decodeEntities(value).replace(/\s+/g, " ").trim();
}

function decodeEntities(value: string) {
  const named: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return value.replace(/&(#x[\da-f]+|#\d+|\w+);/gi, (whole, code: string) => {
    if (code[0] === "#") {
      const n = code[1].toLowerCase() === "x" ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(n) && n <= 0x10ffff ? String.fromCodePoint(n) : whole;
    }
    return named[code.toLowerCase()] ?? whole;
  });
}

/** 루프백·사설망·링크 로컬 등 내부 주소로의 요청을 막는다. */
async function assertPublicHost(hostname: string) {
  const host = hostname.replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".internal")) {
    throw new BlockedUrlError("접근할 수 없는 주소예요.");
  }
  const addresses = isIP(host)
    ? [host]
    : await lookup(host, { all: true, verbatim: true })
        .then((list) => list.map((a) => a.address))
        .catch(() => {
          throw new OpenGraphError("주소를 찾을 수 없어요.");
        });
  if (addresses.some(isPrivateAddress)) throw new BlockedUrlError("접근할 수 없는 주소예요.");
}

function isPrivateAddress(address: string) {
  if (isIP(address) === 4) {
    const [a, b] = address.split(".").map(Number);
    return (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 100 && b >= 64 && b <= 127) ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      a >= 224
    );
  }
  const v6 = address.toLowerCase();
  const mapped = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(v6);
  if (mapped) return isPrivateAddress(mapped[1]);
  return (
    v6 === "::" ||
    v6 === "::1" ||
    v6.startsWith("fc") ||
    v6.startsWith("fd") ||
    v6.startsWith("fe8") ||
    v6.startsWith("fe9") ||
    v6.startsWith("fea") ||
    v6.startsWith("feb")
  );
}
