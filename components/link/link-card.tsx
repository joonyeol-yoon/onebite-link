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
      className="card-hover flex h-full flex-col overflow-hidden rounded-xl bg-[var(--card)] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      {bookmark.image && (
        // 썸네일은 임의의 외부 도메인이라 next/image(remotePatterns 필요) 대신 img를 쓴다.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={bookmark.image}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="aspect-[1.91/1] w-full border-b border-[var(--divider)] bg-[var(--hover-bg)] object-cover"
        />
      )}
      <div className="flex flex-1 flex-col gap-5 p-6">
        {/* 우측 상단은 삭제 버튼 자리라, 외부 링크 표시는 도메인 옆에 둔다. */}
        {!bookmark.image && (
          <span
            aria-hidden
            className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-[var(--divider)] bg-[var(--bg)] text-[17px] font-semibold text-[var(--text)]"
          >
            {bookmark.title.charAt(0).toUpperCase()}
          </span>
        )}
        <div className="flex flex-col gap-1">
          <h3 className="line-clamp-2 text-[17px] leading-[1.35] font-semibold tracking-[-0.2px] text-[var(--text)]">
            {bookmark.title}
          </h3>
          {bookmark.description && (
            <p className="line-clamp-2 text-[14px] leading-[1.4] text-[var(--text-sub)]">
              {bookmark.description}
            </p>
          )}
        </div>
        <span className="mt-auto flex items-center gap-1 text-[13px] text-[var(--text-sub)]">
          <span className="truncate">{hostname}</span>
          <ArrowUpRightIcon className="card-arrow size-3.5 shrink-0" />
        </span>
      </div>
    </a>
  );
}
