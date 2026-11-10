"use client";

import { useActionState } from "react";
import type { Bookmark, Folder } from "@/lib/types";
import { updateBookmark, type UpdateBookmarkState } from "@/lib/actions";
import FolderSelect from "@/components/link-form/folder-select";

type Props = {
  bookmark: Bookmark;
  folders: Folder[];
  titleId: string;
  onDone: () => void;
};

const FIELD_CLASS =
  "rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[17px] text-[var(--text)] transition-[border-color,box-shadow] duration-300 ease-[ease] placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--focus-ring)] focus:outline-none";

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
      folderId: String(bookmark.folderId),
      title: bookmark.title,
      description: bookmark.description,
    },
  );

  const prefix = `edit-link-${bookmark.id}`;

  return (
    <form action={formAction} className="flex flex-col gap-5 p-8">
      <h2
        id={titleId}
        className="text-[24px] leading-[1.2] font-semibold tracking-[-0.3px] text-[var(--text)]"
      >
        링크 수정
      </h2>

      <FolderSelect id={`${prefix}-folder`} folders={folders} defaultValue={state.folderId} />

      <div className="flex flex-col gap-2">
        <label htmlFor={`${prefix}-title`} className="text-[14px] font-medium text-[var(--text)]">
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
          className={FIELD_CLASS}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={`${prefix}-description`}
          className="text-[14px] font-medium text-[var(--text)]"
        >
          설명
        </label>
        <textarea
          id={`${prefix}-description`}
          name="description"
          rows={3}
          maxLength={300}
          defaultValue={state.description}
          placeholder="이 링크에 대한 메모를 남겨 보세요."
          className={`${FIELD_CLASS} resize-none leading-[1.5]`}
        />
      </div>

      {state.error && (
        <p aria-live="polite" className="text-[14px] text-[var(--error)]">
          {state.error}
        </p>
      )}

      <div className="mt-3 flex items-center justify-end gap-6">
        <button
          type="button"
          onClick={onDone}
          className="btn-secondary text-[17px] text-[var(--accent)]"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={pending}
          className="btn-primary rounded-full bg-[var(--accent)] px-6 py-3 text-[17px] text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
