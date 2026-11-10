"use client";

import { useActionState } from "react";
import type { Folder } from "@/lib/types";
import { createBookmark, type CreateBookmarkState } from "@/lib/actions";
import UrlInput from "./url-input";
import FolderSelect from "./folder-select";
import SaveButton from "./save-button";

type Props = {
  folders: Folder[];
};

const initialState: CreateBookmarkState = { url: "", folderId: "" };

export default function LinkForm({ folders }: Props) {
  const [state, formAction, pending] = useActionState(createBookmark, initialState);

  return (
    <form
      action={formAction}
      className="flex max-w-[640px] flex-col gap-5 rounded-3xl bg-[var(--card)] p-6 md:p-10"
    >
      <UrlInput defaultValue={state.url} error={state.error} />
      <FolderSelect folders={folders} defaultValue={state.folderId} />
      <div className="mt-5 flex flex-col">
        <SaveButton pending={pending} />
      </div>
    </form>
  );
}
