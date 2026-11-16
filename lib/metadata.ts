import type { Metadata } from "next";

export const SITE_NAME = "한입 링크";
export const SITE_DESCRIPTION = "나만의 북마크를 폴더별로 정리하는 서비스";

/** 오픈그래프 이미지 등 절대 주소가 필요한 메타 태그의 기준 URL. */
export const SITE_URL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
);

/** public/thumbnail.png — 링크 공유 시 보이는 썸네일. */
const THUMBNAIL = { url: "/thumbnail.png", alt: SITE_NAME };

/**
 * 페이지별 메타데이터를 만든다.
 * openGraph·twitter는 하위 세그먼트에서 통째로 덮어써지므로(얕은 병합) 페이지마다 썸네일까지 함께 넣어 준다.
 */
export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
}: { title?: string; description?: string } = {}): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  return {
    title: fullTitle,
    description,
    openGraph: {
      type: "website",
      locale: "ko_KR",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [THUMBNAIL],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [THUMBNAIL],
    },
  };
}
