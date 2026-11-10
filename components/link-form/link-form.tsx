import type { Folder } from "@/lib/types";
import UrlInput from "./url-input";
import FolderSelect from "./folder-select";
import SaveButton from "./save-button";

type Props = {
  folders: Folder[];
};

export default function LinkForm({ folders }: Props) {
  return (
    <form className="flex flex-col gap-5 rounded-xl bg-[var(--card)] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] md:p-8">
      <UrlInput />
      <FolderSelect folders={folders} />
      <div className="mt-3 flex flex-col">
        <SaveButton />
      </div>
    </form>
  );
}
