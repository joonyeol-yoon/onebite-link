"use client";

import { useRef, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Folder } from "@/lib/types";
import { deleteFolder } from "@/lib/actions";
import { TrashIcon } from "@/components/icons";
import Modal from "@/components/modal";

type Props = {
  folder: Folder;
  count: number;
};

export default function DeleteFolderButton({ folder, count }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const titleId = `delete-folder-title-${folder.id}`;

  const close = () => dialogRef.current?.close();

  const confirm = () => {
    startTransition(async () => {
      await deleteFolder(folder.id);
      close();
      // 지금 보고 있는 폴더를 지웠다면 전체 목록으로 이동
      if (pathname === `/folder/${folder.id}`) router.replace("/");
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`${folder.name} 폴더 삭제`}
        className="absolute top-1/2 right-1.5 hidden size-7 -translate-y-1/2 place-items-center rounded-md text-ink-muted opacity-0 transition-[opacity,color,background-color] group-hover/folder:opacity-100 hover:bg-red-50 hover:text-red-600 focus-visible:opacity-100 md:grid"
      >
        <TrashIcon className="size-4" />
      </button>

      <Modal ref={dialogRef} labelledBy={titleId} onClose={close}>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-2">
            <h2 id={titleId} className="text-lg font-bold tracking-tight text-ink">
              폴더를 삭제할까요?
            </h2>
            <p className="text-sm leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">{folder.name}</strong> 폴더를
              삭제합니다.
              {count > 0 && ` 폴더 안의 링크 ${count}개도 함께 삭제돼요.`} 삭제한 뒤에는 되돌릴 수
              없어요.
            </p>
          </div>

          <div className="flex justify-end gap-2 border-t border-line pt-5">
            <button
              type="button"
              onClick={close}
              autoFocus
              className="h-10 rounded-lg border border-line-strong bg-surface px-4 text-sm font-semibold text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
            >
              취소
            </button>
            <button
              type="button"
              onClick={confirm}
              disabled={pending}
              className="h-10 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white shadow-[0_1px_2px_rgb(27_29_41/0.12)] transition-colors hover:bg-red-700 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending ? "삭제 중…" : "삭제"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
