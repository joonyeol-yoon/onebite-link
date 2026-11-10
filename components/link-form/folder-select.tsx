import type { Folder } from "@/lib/types";
import { ChevronDownIcon } from "@/components/icons";

type Props = {
  folders: Folder[];
  defaultValue?: string;
  /** 한 화면에 여러 개 렌더링될 때 겹치지 않도록 id를 지정한다. */
  id?: string;
};

export default function FolderSelect({ folders, defaultValue = "", id = "folderId" }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[14px] font-medium text-[var(--text)]">
        폴더
      </label>
      <div className="relative">
        <select
          id={id}
          name="folderId"
          required
          defaultValue={defaultValue}
          className="w-full appearance-none rounded-[10px] border border-[var(--border)] bg-[var(--bg)] py-3 pr-11 pl-4 text-[17px] text-[var(--text)] transition-[border-color,box-shadow] duration-300 ease-[ease] invalid:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--focus-ring)] focus:outline-none"
        >
          <option value="" disabled>
            폴더를 선택하세요
          </option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id} className="text-[var(--text)]">
              {folder.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[var(--text-sub)]" />
      </div>
    </div>
  );
}
