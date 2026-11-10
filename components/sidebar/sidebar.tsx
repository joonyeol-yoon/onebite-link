import type { Bookmark, Folder } from "@/lib/types";
import AllButton from "./all-button";
import FolderList from "./folder-list";

type Props = {
  folders: Folder[];
  bookmarks: Bookmark[];
};

export default function Sidebar({ folders, bookmarks }: Props) {
  return (
    <aside className="flex w-60 shrink-0 flex-col gap-6 border-r border-zinc-200 bg-white p-4">
      <AllButton count={bookmarks.length} />
      <FolderList folders={folders} bookmarks={bookmarks} />
    </aside>
  );
}
