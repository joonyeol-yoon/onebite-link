"use client";

import { useRef, useState } from "react";
import type { Bookmark, Folder } from "@/lib/types";
import { PencilIcon } from "@/components/icons";
import Modal from "@/components/modal";
import EditLinkForm from "./edit-link-form";

type Props = {
  bookmark: Bookmark;
  folders: Folder[];
};

export default function EditLinkButton({ bookmark, folders }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // 열 때마다 폼을 새로 마운트해 현재 링크 정보로 초기화한다.
  const [formKey, setFormKey] = useState(0);
  const titleId = `edit-link-title-${bookmark.id}`;

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
        aria-label={`${bookmark.title} 링크 수정`}
        className="link-action icon-btn grid size-8 place-items-center rounded-full bg-[var(--glass-bg)] text-[var(--title)] backdrop-blur-[10px]"
      >
        <PencilIcon className="size-4" />
      </button>

      <Modal ref={dialogRef} labelledBy={titleId} onClose={close}>
        <EditLinkForm
          key={formKey}
          bookmark={bookmark}
          folders={folders}
          titleId={titleId}
          onDone={close}
        />
      </Modal>
    </>
  );
}
