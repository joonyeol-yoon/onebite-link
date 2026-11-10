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
      className="flex shrink-0 gap-1 overflow-x-auto border-b border-line bg-surface px-4 py-2 md:w-60 md:flex-col md:gap-6 md:overflow-visible md:border-r md:border-b-0 md:p-4"
    >
      <AllButton count={bookmarks.length} />
      <FolderList folders={folders} bookmarks={bookmarks} />
    </nav>
  );
}
