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
    <form action={formAction} className="flex flex-col gap-6 p-6">
      <h2 id={titleId} className="text-lg font-bold tracking-tight text-ink">
        {title}
      </h2>

      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="text-sm font-semibold text-ink">
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
          className="h-11 rounded-lg border border-line-strong bg-surface px-3.5 text-sm text-ink transition-[border-color,box-shadow] placeholder:text-ink-muted hover:border-ink-muted focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)] focus:outline-none aria-invalid:border-red-600"
        />
        {state.error && (
          <p id={errorId} aria-live="polite" className="text-xs text-red-600">
            {state.error}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 border-t border-line pt-5">
        <button
          type="button"
          onClick={onDone}
          className="h-10 rounded-lg border border-line-strong bg-surface px-4 text-sm font-semibold text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={pending}
          className="h-10 rounded-lg bg-accent px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgb(27_29_41/0.12)] transition-colors hover:bg-accent-hover active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "저장 중…" : "저장"}
        </button>
      </div>
    </form>
  );
}
