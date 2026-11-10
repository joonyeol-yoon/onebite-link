"use client";

import Modal from "./modal";

type Props = {
  ref: React.Ref<HTMLDialogElement>;
  titleId: string;
  title: string;
  children: React.ReactNode;
  confirmLabel: string;
  pendingLabel: string;
  pending: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

/** 삭제처럼 되돌릴 수 없는 동작을 한 번 더 확인하는 모달. 열기는 ref로 `showModal()`을 호출한다. */
export default function ConfirmModal({
  ref,
  titleId,
  title,
  children,
  confirmLabel,
  pendingLabel,
  pending,
  onConfirm,
  onClose,
}: Props) {
  return (
    <Modal ref={ref} labelledBy={titleId} onClose={onClose}>
      <div className="flex flex-col gap-5 p-8">
        <div className="flex flex-col gap-3">
          <h2
            id={titleId}
            className="text-[24px] leading-[1.2] font-semibold tracking-[-0.3px] text-[var(--text)]"
          >
            {title}
          </h2>
          <p className="text-[17px] leading-[1.5] text-[var(--text-sub)]">{children}</p>
        </div>

        <div className="mt-3 flex items-center justify-end gap-6">
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="btn-secondary text-[17px] text-[var(--accent)]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={pending}
            className="btn-danger rounded-full bg-[var(--error)] px-6 py-3 text-[17px] text-white disabled:cursor-not-allowed disabled:opacity-30"
          >
            {pending ? pendingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
