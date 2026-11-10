import type { Folder } from "@/lib/types";
import UrlInput from "./url-input";
import FolderSelect from "./folder-select";
import SaveButton from "./save-button";

type Props = {
  folders: Folder[];
};

export default function LinkForm({ folders }: Props) {
  return (
    <form className="flex max-w-xl flex-col gap-5 rounded-xl border border-zinc-200 bg-white p-6">
      <UrlInput />
      <FolderSelect folders={folders} />
      <SaveButton />
    </form>
  );
}
