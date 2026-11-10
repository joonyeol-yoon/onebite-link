import type { Bookmark, Folder } from "@/lib/types";
import FolderItem from "./folder-item";

type Props = {
  folders: Folder[];
  bookmarks: Bookmark[];
};

export default function FolderList({ folders, bookmarks }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
        폴더
      </h2>
      <ul className="flex flex-col gap-1">
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
