"use client";

import { useEffect } from "react";

type Props = {
  message: string;
  onClose: () => void;
  /** 자동으로 사라지기까지의 시간(ms) */
  duration?: number;
};

/** 화면 상단 가운데에 잠시 나타났다 사라지는 오류 토스트 */
export default function Toast({ message, onClose, duration = 3000 }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center px-5">
      <div
        role="alert"
        className="toast-enter pointer-events-auto w-full max-w-[400px] rounded-lg bg-[var(--surface-strong)] px-5 py-3.5 text-center text-[15px] font-medium text-[var(--on-accent)] shadow-[0_8px_24px_rgba(0,0,0,0.18)]"
      >
        {message}
      </div>
    </div>
  );
}
