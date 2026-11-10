"use client";

import { useActionState } from "react";
import { FOLDER_NAME_MAX_LENGTH, type FolderNameState } from "@/lib/folder-name";
import {
  BUTTON_OUTLINE,
  BUTTON_PRIMARY,
  INPUT_CLASS,
  LABEL_CLASS,
  MODAL_TITLE_CLASS,
} from "@/lib/ui";

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
      <h2 id={titleId} className={MODAL_TITLE_CLASS}>
        {title}
      </h2>

      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className={LABEL_CLASS}>
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
          className={INPUT_CLASS}
        />
        {state.error && (
          <p id={errorId} aria-live="polite" className="text-[14px] text-[var(--error)]">
            {state.error}
          </p>
        )}
      </div>

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
