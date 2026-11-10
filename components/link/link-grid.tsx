import Link from "next/link";
import type { Bookmark, Folder } from "@/lib/types";
import { PlusIcon } from "@/components/icons";
import { BUTTON_OUTLINE } from "@/lib/ui";
import LinkCard from "./link-card";
import EditLinkButton from "./edit-link-button";
import DeleteLinkButton from "./delete-link-button";

type Props = {
  bookmarks: Bookmark[];
  /** 링크 수정 모달의 폴더 선택지 */
  folders: Folder[];
};

export default function LinkGrid({ bookmarks, folders }: Props) {
  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-8 rounded-3xl bg-[var(--card)] px-6 py-24 text-center">
        <div className="flex flex-col gap-3">
          <p className="text-[28px] leading-[1.2] font-semibold tracking-[-0.015em] text-[var(--title)]">
            아직 저장한 링크가 없어요
          </p>
          <p className="text-[16px] text-[var(--text-sub)]">
            자주 찾는 페이지를 저장해 두고 한 번에 열어 보세요.
          </p>
        </div>
        <Link href="/new" className={BUTTON_OUTLINE}>
          <PlusIcon />
          링크 추가하기
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-x-[25px] gap-y-10 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {bookmarks.map((bookmark) => (
        // 링크(<a>) 안에 버튼을 중첩할 수 없으므로 수정·삭제 버튼은 형제로 두고 우측 상단에 겹쳐 배치한다.
        <li key={bookmark.id} className="link-item relative">
          <LinkCard bookmark={bookmark} />
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5">
            <EditLinkButton bookmark={bookmark} folders={folders} />
            <DeleteLinkButton bookmark={bookmark} />
          </div>
        </li>
      ))}
    </ul>
  );
}
