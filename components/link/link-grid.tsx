import Link from "next/link";
import type { Bookmark } from "@/lib/types";
import { PlusIcon } from "@/components/icons";
import LinkCard from "./link-card";
import DeleteLinkButton from "./delete-link-button";

type Props = {
  bookmarks: Bookmark[];
};

export default function LinkGrid({ bookmarks }: Props) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-5 rounded-xl bg-[var(--card)] px-6 py-20 text-center">
        <div className="flex flex-col gap-2">
          <p className="text-[24px] leading-[1.2] font-semibold tracking-[-0.3px] text-[var(--text)]">
            아직 저장한 링크가 없어요
          </p>
          <p className="text-[17px] text-[var(--text-sub)]">
            자주 찾는 페이지를 저장해 두고 한 번에 열어 보세요.
          </p>
        </div>
        <Link
          href="/new"
          className="btn-secondary flex items-center gap-1 text-[17px] text-[var(--accent)]"
        >
          <PlusIcon />
          링크 추가하기
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {bookmarks.map((bookmark) => (
        // 링크(<a>) 안에 버튼을 중첩할 수 없으므로 삭제 버튼은 형제로 두고 우측 상단에 겹쳐 배치한다.
        <li key={bookmark.id} className="link-item relative">
          <LinkCard bookmark={bookmark} />
          <div className="absolute top-3 right-3">
            <DeleteLinkButton bookmark={bookmark} />
          </div>
        </li>
      ))}
    </ul>
  );
}
