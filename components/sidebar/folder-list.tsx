import type { Bookmark, Folder } from "@/lib/types";
import FolderItem from "./folder-item";

type Props = {
  folders: Folder[];
  bookmarks: Bookmark[];
};

export default function FolderList({ folders, bookmarks }: Props) {
  return (
    <div className="flex items-center gap-2 md:flex-col md:items-stretch">
      <h2 className="hidden border-b border-[var(--divider)] px-3 pb-3 text-[13px] font-semibold tracking-[0.04em] text-[var(--text-sub)] md:mb-1 md:block">
        FOLDERS
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
