import type { Folder } from "@/lib/types";
import { ChevronDownIcon } from "@/components/icons";
import { LABEL_CLASS, SELECT_CLASS } from "@/lib/ui";

type Props = {
  folders: Folder[];
  defaultValue?: string;
  /** 한 화면에 여러 개 렌더링될 때 겹치지 않도록 id를 지정한다. */
  id?: string;
};

export default function FolderSelect({ folders, defaultValue = "", id = "folderId" }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={LABEL_CLASS}>
        폴더
      </label>
      <div className="relative">
        <select
          id={id}
          name="folderId"
          required
          defaultValue={defaultValue}
          className={SELECT_CLASS}
        >
          <option value="" disabled>
            폴더를 선택하세요
          </option>
          {folders.map((folder) => (
            <option key={folder.id} value={folder.id} className="text-[var(--title)]">
              {folder.name}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[var(--title)]" />
      </div>
    </div>
  );
}
