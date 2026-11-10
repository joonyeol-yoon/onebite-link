"use client";

import { useRef, useState } from "react";
import type { Folder } from "@/lib/types";
import type { FolderNameState } from "@/lib/folder-name";
import { updateFolder } from "@/lib/actions";
import { PencilIcon } from "@/components/icons";
import Modal from "@/components/modal";
import FolderNameForm from "@/components/folder-name-form";

type Props = {
  folder: Folder;
};

export default function EditFolderButton({ folder }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // 열 때마다 폼을 새로 마운트해 현재 이름으로 초기화한다.
  const [formKey, setFormKey] = useState(0);
  const titleId = `edit-folder-title-${folder.id}`;

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
        aria-label={`${folder.name} 폴더 이름 수정`}
        className="hidden size-7 place-items-center rounded-md text-ink-muted opacity-0 transition-[opacity,color,background-color] group-focus-within/folder:opacity-100 group-hover/folder:opacity-100 hover:bg-accent-soft hover:text-accent md:grid"
      >
        <PencilIcon className="size-4" />
      </button>

      <Modal ref={dialogRef} labelledBy={titleId} onClose={close}>
        <FolderNameForm
          key={formKey}
          title="폴더 이름 수정"
          titleId={titleId}
          initialName={folder.name}
          action={(prev: FolderNameState, formData: FormData) =>
            updateFolder(folder.id, prev, formData)
          }
          onDone={close}
        />
      </Modal>
    </>
  );
}
