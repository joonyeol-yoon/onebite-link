"use client";

import { useActionState, useRef } from "react";
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
  // 중복 제출 방지: 버튼이 비활성화되기 전에 연달아 누르면 제출이 대기열에 쌓여 차례로 실행된다.
  // 저장 중이거나 이미 저장에 성공해 이동하는 중이면 쌓인 제출을 무시한다.
  const lockedRef = useRef(false);

  const [state, formAction, pending] = useActionState(
    async (prev: CreateBookmarkState, formData: FormData) => {
      if (lockedRef.current) return prev;
      lockedRef.current = true;

      // 성공하면 서버가 폴더 페이지로 이동시키므로(잠금 유지), 결과가 돌아왔다면 에러가 난 경우다.
      const result = await createBookmark(prev, formData);
      lockedRef.current = false;
      return result;
    },
    initialState,
  );

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
