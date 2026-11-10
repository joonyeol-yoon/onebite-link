import type { Folder } from "@/lib/types";
import { ChevronDownIcon } from "@/components/icons";

type Props = {
  folders: Folder[];
};

export default function FolderSelect({ folders }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="folderId" className="text-sm font-semibold text-ink">
        폴더
      </label>
      <div className="relative">
        <select
          id="folderId"
          name="folderId"
          required
          defaultValue=""
          className="h-11 w-full appearance-none rounded-lg border border-line-strong bg-surface pr-10 pl-3.5 text-sm text-ink transition-[border-color,box-shadow] invalid:text-ink-muted hover:border-ink-muted focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)] focus:outline-none"
        >
          <option value="" disabled>
            폴더를 선택하세요
          </option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id} className="text-ink">
              {folder.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-muted" />
      </div>
    </div>
  );
}
