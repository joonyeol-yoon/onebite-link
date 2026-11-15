"use client";

import { useFormStatus } from "react-dom";
import { LogoutIcon } from "@/components/icons";
import { logout } from "@/lib/auth-actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="nav-item flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-[15px] font-medium text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40 md:w-full"
    >
      <span className="nav-icon text-[var(--text-sub)]">
        <LogoutIcon />
      </span>
      <span className="truncate text-left md:flex-1">{pending ? "로그아웃 중…" : "로그아웃"}</span>
    </button>
  );
}

/** 사이드바 맨 아래에 두는 로그아웃 버튼 */
export default function LogoutButton() {
  return (
    <form
      action={logout}
      className="ml-auto shrink-0 md:mt-auto md:ml-0 md:border-t md:border-[var(--divider)] md:pt-4"
    >
      <SubmitButton />
    </form>
  );
}
