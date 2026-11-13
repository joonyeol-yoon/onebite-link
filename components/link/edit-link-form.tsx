"use client";

import { useActionState } from "react";
import type { Bookmark, Folder } from "@/lib/types";
import { updateBookmark, type UpdateBookmarkState } from "@/lib/actions";
import FolderSelect from "@/components/link-form/folder-select";
import {
  BUTTON_OUTLINE,
  BUTTON_PRIMARY,
  INPUT_CLASS,
  LABEL_CLASS,
  MODAL_TITLE_CLASS,
  TEXTAREA_CLASS,
} from "@/lib/ui";

type Props = {
  bookmark: Bookmark;
  folders: Folder[];
  titleId: string;
  onDone: () => void;
};

/** 링크의 폴더·제목·설명을 수정하는 모달 폼. */
export default function EditLinkForm({ bookmark, folders, titleId, onDone }: Props) {
  const [state, formAction, pending] = useActionState(
    async (prev: UpdateBookmarkState, formData: FormData) => {
      const result = await updateBookmark(bookmark.id, prev, formData);
      if (result.ok) onDone();
      return result;
    },
    {
      ok: false,
      // 폴더가 삭제된 링크는 folderId가 null이므로 "폴더를 선택하세요"가 선택되도록 빈 값을 쓴다.
      folderId: bookmark.folderId === null ? "" : String(bookmark.folderId),
      title: bookmark.title,
      description: bookmark.description,
    },
  );

  const prefix = `edit-link-${bookmark.id}`;

  return (
    <form action={formAction} className="flex flex-col gap-5 p-8">
      <h2 id={titleId} className={MODAL_TITLE_CLASS}>
        링크 수정
      </h2>

      <FolderSelect id={`${prefix}-folder`} folders={folders} defaultValue={state.folderId} />

      <div className="flex flex-col gap-2">
        <label htmlFor={`${prefix}-title`} className={LABEL_CLASS}>
          제목
        </label>
        <input
          id={`${prefix}-title`}
          name="title"
          type="text"
          required
          autoFocus
          maxLength={100}
          defaultValue={state.title}
          className={INPUT_CLASS}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={`${prefix}-description`} className={LABEL_CLASS}>
          설명
        </label>
        <textarea
          id={`${prefix}-description`}
          name="description"
          rows={3}
          maxLength={300}
          defaultValue={state.description}
          placeholder="이 링크에 대한 메모를 남겨 보세요."
          className={TEXTAREA_CLASS}
        />
      </div>

      {state.error && (
        <p aria-live="polite" className="text-[14px] text-[var(--error)]">
          {state.error}
        </p>
      )}

      <div className="mt-3 flex justify-end gap-2">
        <button type="button" onClick={onDone} className={BUTTON_OUTLINE}>
          취소
        </button>
        <button type="submit" disabled={pending} className={BUTTON_PRIMARY}>
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
