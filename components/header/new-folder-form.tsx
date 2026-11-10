"use client";

import { useActionState } from "react";
import { createFolder, type CreateFolderState } from "@/lib/actions";

type Props = {
  onDone: () => void;
};

const initialState: CreateFolderState = { ok: false, name: "" };

export default function NewFolderForm({ onDone }: Props) {
  const [state, formAction, pending] = useActionState(
    async (prev: CreateFolderState, formData: FormData) => {
      const result = await createFolder(prev, formData);
      if (result.ok) onDone();
      return result;
    },
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-6 p-6">
      <h2 id="new-folder-title" className="text-lg font-bold tracking-tight text-ink">
        새 폴더
      </h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="folder-name" className="text-sm font-semibold text-ink">
          폴더 이름
        </label>
        <input
          id="folder-name"
          name="name"
          type="text"
          required
          autoFocus
          maxLength={20}
          defaultValue={state.name}
          placeholder="예) 개발"
          aria-invalid={state.error ? true : undefined}
          aria-describedby={state.error ? "folder-name-error" : undefined}
          className="h-11 rounded-lg border border-line-strong bg-surface px-3.5 text-sm text-ink transition-[border-color,box-shadow] placeholder:text-ink-muted hover:border-ink-muted focus:border-accent focus:shadow-[0_0_0_3px_var(--color-accent-soft)] focus:outline-none aria-invalid:border-red-600"
        />
        {state.error && (
          <p id="folder-name-error" aria-live="polite" className="text-xs text-red-600">
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
