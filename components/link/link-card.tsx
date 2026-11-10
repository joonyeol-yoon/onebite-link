import type { Bookmark } from "@/lib/types";
import { ArrowUpRightIcon } from "@/components/icons";

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
      className="card-hover flex h-full flex-col gap-5 rounded-xl bg-[var(--card)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-[var(--divider)] bg-[var(--bg)] text-[17px] font-semibold text-[var(--text)]"
        >
          {bookmark.title.charAt(0).toUpperCase()}
        </span>
        <ArrowUpRightIcon className="card-arrow size-4 text-[var(--text-sub)]" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="truncate text-[17px] font-semibold tracking-[-0.2px] text-[var(--text)]">
          {bookmark.title}
        </h3>
        <p className="line-clamp-2 text-[14px] leading-[1.4] text-[var(--text-sub)]">
          {bookmark.description}
        </p>
      </div>
      <span className="mt-auto truncate text-[13px] text-[var(--text-sub)]">{hostname}</span>
    </a>
  );
}
