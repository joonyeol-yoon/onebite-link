"use client";

import { useActionState } from "react";
import { FOLDER_NAME_MAX_LENGTH, type FolderNameState } from "@/lib/folder-name";

type Props = {
  title: string;
  titleId: string;
  initialName?: string;
  action: (prev: FolderNameState, formData: FormData) => Promise<FolderNameState>;
  onDone: () => void;
};

/** 폴더 이름을 입력받는 모달 폼. 새 폴더 생성과 이름 수정에 함께 쓴다. */
export default function FolderNameForm({ title, titleId, initialName = "", action, onDone }: Props) {
  const [state, formAction, pending] = useActionState(
    async (prev: FolderNameState, formData: FormData) => {
      const result = await action(prev, formData);
      if (result.ok) onDone();
      return result;
    },
    { ok: false, name: initialName },
  );

  const inputId = `${titleId}-input`;
  const errorId = `${titleId}-error`;

  return (
    <form action={formAction} className="flex flex-col gap-5 p-8">
      <h2
        id={titleId}
        className="text-[24px] leading-[1.2] font-semibold tracking-[-0.3px] text-[var(--text)]"
      >
        {title}
      </h2>

      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-[14px] font-medium text-[var(--text)]">
          폴더 이름
        </label>
        <input
          id={inputId}
          name="name"
          type="text"
          required
          autoFocus
          maxLength={FOLDER_NAME_MAX_LENGTH}
          defaultValue={state.name}
          placeholder="예) 개발"
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? errorId : undefined}
          className="rounded-[10px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-[17px] text-[var(--text)] transition-[border-color,box-shadow] duration-300 ease-[ease] placeholder:text-[var(--placeholder)] focus:border-[var(--accent)] focus:shadow-[0_0_0_3px_var(--focus-ring)] focus:outline-none aria-invalid:border-[var(--error)]"
        />
        {state.error && (
          <p id={errorId} aria-live="polite" className="text-[14px] text-[var(--error)]">
            {state.error}
          </p>
        )}
      </div>

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
