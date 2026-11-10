import type { Folder } from "@/lib/types";
import UrlInput from "./url-input";
import FolderSelect from "./folder-select";
import SaveButton from "./save-button";

type Props = {
  folders: Folder[];
};

export default function LinkForm({ folders }: Props) {
  return (
    <form className="flex max-w-xl flex-col gap-6 rounded-xl border border-line bg-surface p-6 shadow-[0_1px_3px_rgb(27_29_41/0.06)] md:p-8">
      <UrlInput />
      <FolderSelect folders={folders} />
      <div className="flex flex-col border-t border-line pt-6">
        <SaveButton />
      </div>
    </form>
  );
}
