import type { Bookmark, Folder } from "@/lib/types";
import FolderItem from "./folder-item";

type Props = {
  folders: Folder[];
  bookmarks: Bookmark[];
};

export default function FolderList({ folders, bookmarks }: Props) {
  return (
    <div className="flex items-center gap-2 md:flex-col md:items-stretch">
      <h2 className="hidden px-3 pb-1 text-[13px] font-medium text-[var(--text-sub)] md:block">
        폴더
      </h2>
      <ul className="flex gap-1 md:flex-col">
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            folder={folder}
            count={bookmarks.filter((b) => b.folderId === folder.id).length}
          />
        ))}
      </ul>
    </div>
  );
}
