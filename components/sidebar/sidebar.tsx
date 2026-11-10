import type { Bookmark, Folder } from "@/lib/types";
import AllButton from "./all-button";
import FolderList from "./folder-list";

type Props = {
  folders: Folder[];
  bookmarks: Bookmark[];
};

export default function Sidebar({ folders, bookmarks }: Props) {
  return (
    <nav
      aria-label="폴더 탐색"
      className="flex shrink-0 gap-1 overflow-x-auto border-b border-[var(--divider)] bg-[var(--bg)] px-6 py-3 md:sticky md:top-12 md:h-[calc(100dvh-3rem)] md:w-60 md:flex-col md:gap-8 md:overflow-y-auto md:border-r md:border-b-0 md:px-4 md:py-8"
    >
      <AllButton count={bookmarks.length} />
      <FolderList folders={folders} bookmarks={bookmarks} />
    </nav>
  );
}
