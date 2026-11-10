"use client";

import { useRef, useState } from "react";
import { FolderPlusIcon } from "@/components/icons";
import Modal from "@/components/modal";
import FolderNameForm from "@/components/folder-name-form";
import { createFolder } from "@/lib/actions";
import { BUTTON_SMALL } from "@/lib/ui";

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
        className={`btn-outline ${BUTTON_SMALL} border-[var(--title)] text-[var(--title)]`}
      >
        <FolderPlusIcon className="size-3.5" />
        새 폴더
      </button>

      <Modal ref={dialogRef} labelledBy="new-folder-title" onClose={close}>
        <FolderNameForm
          key={formKey}
          title="새 폴더"
          titleId="new-folder-title"
          action={createFolder}
          onDone={close}
        />
      </Modal>
    </>
  );
}
