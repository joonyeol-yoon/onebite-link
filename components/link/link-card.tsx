import type { Bookmark } from "@/lib/types";
import { ArrowUpRightIcon } from "@/components/icons";

const MONOGRAM_TONES = [
  "bg-indigo-50 text-indigo-700",
  "bg-sky-50 text-sky-700",
  "bg-emerald-50 text-emerald-700",
  "bg-amber-50 text-amber-800",
  "bg-rose-50 text-rose-700",
  "bg-violet-50 text-violet-700",
];

function toneFor(key: string) {
  let hash = 0;
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return MONOGRAM_TONES[Math.abs(hash) % MONOGRAM_TONES.length];
}

type Props = {
  bookmark: Bookmark;
};

export default function LinkCard({ bookmark }: Props) {
  const hostname = new URL(bookmark.url).hostname.replace(/^www\./, "");

  return (
    <a
      href={bookmark.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col gap-4 rounded-xl border border-line bg-surface p-5 transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-accent-line hover:shadow-[0_8px_24px_-8px_rgb(27_29_41/0.14)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden
          className={`grid size-10 shrink-0 place-items-center rounded-lg text-base font-bold ${toneFor(hostname)}`}
        >
          {bookmark.title.charAt(0).toUpperCase()}
        </span>
        <ArrowUpRightIcon className="size-4 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="truncate font-semibold text-ink group-hover:text-accent">
          {bookmark.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {bookmark.description}
        </p>
      </div>
      <span className="mt-auto truncate border-t border-line pt-3 text-xs text-ink-muted">
        {hostname}
      </span>
    </a>
  );
}
