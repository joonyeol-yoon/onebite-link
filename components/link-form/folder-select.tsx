import type { Folder } from "@/lib/types";

type Props = {
  folders: Folder[];
};

export default function FolderSelect({ folders }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor="folderId" className="text-sm font-medium text-zinc-700">
        폴더
      </label>
      <select
        id="folderId"
        name="folderId"
        required
        defaultValue=""
        className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-900 focus:outline-none"
      >
        <option value="" disabled>
          폴더를 선택하세요
        </option>
        {folders.map((folder) => (
          <option key={folder.id} value={folder.id}>
            {folder.name}
          </option>
        ))}
      </select>
    </div>
  );
}
