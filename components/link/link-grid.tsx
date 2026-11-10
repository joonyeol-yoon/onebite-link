import Link from "next/link";
import type { Bookmark } from "@/lib/types";
import { LinkIcon, PlusIcon } from "@/components/icons";
import LinkCard from "./link-card";

type Props = {
  bookmarks: Bookmark[];
};

export default function LinkGrid({ bookmarks }: Props) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line-strong bg-surface px-6 py-16 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
          <LinkIcon className="size-5" />
        </span>
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-ink">아직 저장한 링크가 없어요</p>
          <p className="text-sm text-ink-muted">자주 찾는 페이지를 저장해 두고 한 번에 열어 보세요.</p>
        </div>
        <Link
          href="/new"
          className="mt-2 flex items-center gap-1.5 rounded-lg border border-line px-3.5 py-2 text-sm font-semibold text-accent transition-colors hover:border-accent-line hover:bg-accent-soft"
        >
          <PlusIcon />
          링크 추가하기
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {bookmarks.map((bookmark) => (
        <li key={bookmark.id}>
          <LinkCard bookmark={bookmark} />
        </li>
      ))}
    </ul>
  );
}
