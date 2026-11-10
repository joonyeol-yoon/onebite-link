"use client";

import { useRef, useState } from "react";
import { FolderPlusIcon } from "@/components/icons";
import NewFolderForm from "./new-folder-form";

export default function NewFolderButton() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // 열 때마다 폼을 새로 마운트해 입력값과 에러 상태를 초기화한다.
  const [formKey, setFormKey] = useState(0);

  const open = () => {
    setFormKey((key) => key + 1);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="flex items-center gap-1.5 rounded-lg border border-line-strong bg-surface px-3.5 py-2 text-sm font-semibold text-ink-soft transition-colors hover:bg-canvas hover:text-ink active:translate-y-px"
      >
        <FolderPlusIcon className="size-4" />
        새 폴더
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="new-folder-title"
        onClick={(e) => {
          // 바깥(backdrop) 클릭 시 닫기
          if (e.target === e.currentTarget) close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl border border-line bg-surface p-0 text-ink shadow-[0_12px_40px_rgb(27_29_41/0.18)] backdrop:bg-ink/40"
      >
        <NewFolderForm key={formKey} onDone={close} />
      </dialog>
    </>
  );
}
