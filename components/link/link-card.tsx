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
      className="card-hover flex h-full flex-col"
    >
      {/* 이미지 영역: radius 24px, 썸네일이 없으면 첫 글자를 크게 보여 준다 */}
      <div className="relative aspect-[1.91/1] overflow-hidden rounded-3xl bg-[var(--card)]">
        {bookmark.image ? (
          // 썸네일은 임의의 외부 도메인이라 next/image(remotePatterns 필요) 대신 img를 쓴다.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={bookmark.image}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="size-full object-cover"
          />
        ) : (
          <span
            aria-hidden
            className="grid size-full place-items-center text-[56px] leading-none font-semibold text-[var(--title)]"
          >
            {bookmark.title.charAt(0).toUpperCase()}
          </span>
        )}
        {/* 호버 시 어두운 오버레이 + 좌측 하단 ↗ 아이콘 (우측 상단은 수정·삭제 버튼 자리) */}
        <span aria-hidden className="card-fade absolute inset-0 bg-[var(--image-dim)]" />
        <ArrowUpRightIcon className="card-fade absolute bottom-3.5 left-3.5 size-7 text-[var(--bg)]" />
      </div>

      <div className="mt-5 flex flex-1 flex-col gap-2">
        <h3 className="card-title line-clamp-2 text-[20px] leading-[1.3] font-semibold tracking-[-0.015em] text-[var(--title)]">
          {bookmark.title}
        </h3>
        {bookmark.description && (
          <p className="line-clamp-2 text-[14px] leading-[1.5] text-[var(--text-sub)]">
            {bookmark.description}
          </p>
        )}
        <span className="mt-auto truncate pt-1 text-[13px] font-medium text-[var(--text-sub)]">
          {hostname}
        </span>
      </div>
    </a>
  );
}
