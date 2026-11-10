"use client";

type Props = {
  ref: React.Ref<HTMLDialogElement>;
  labelledBy: string;
  onClose: () => void;
  children: React.ReactNode;
};

/** 화면 가운데 뜨는 모달. 열기는 ref로 `showModal()`을 호출한다. */
export default function Modal({ ref, labelledBy, onClose, children }: Props) {
  return (
    <dialog
      ref={ref}
      aria-labelledby={labelledBy}
      onClick={(e) => {
        // 바깥(backdrop) 클릭 시 닫기
        if (e.target === e.currentTarget) onClose();
      }}
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-xl border border-line bg-surface p-0 text-ink shadow-[0_12px_40px_rgb(27_29_41/0.18)] backdrop:bg-ink/40"
    >
      {children}
    </dialog>
  );
}
