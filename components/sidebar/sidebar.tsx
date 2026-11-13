import type { Bookmark, Folder } from "@/lib/types";
import AllButton from "./all-button";
import FolderList from "./folder-list";

type Props = {
  folders: Folder[];
  bookmarks: Bookmark[];
};

const NAV_CLASS =
  "flex shrink-0 gap-1 overflow-x-auto border-b border-[var(--divider)] bg-[var(--bg)] px-5 py-3 md:sticky md:top-[72px] md:h-[calc(100dvh-72px)] md:w-64 md:flex-col md:gap-8 md:overflow-y-auto md:border-r md:border-b-0 md:px-4 md:py-10";

/** 폴더를 불러오는 동안 보여 줄 빈 사이드바. 현재 주소를 쓰지 않아야 미리 렌더링할 수 있다. */
export function SidebarPlaceholder() {
  return <nav aria-label="폴더 탐색" aria-busy className={NAV_CLASS} />;
}

export default function Sidebar({ folders, bookmarks }: Props) {
  return (
    <nav aria-label="폴더 탐색" className={NAV_CLASS}>
      <AllButton count={bookmarks.length} />
      <FolderList folders={folders} bookmarks={bookmarks} />
    </nav>
  );
}
