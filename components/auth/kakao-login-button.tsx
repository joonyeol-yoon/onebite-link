"use client";

import Image from "next/image";
import { useFormStatus } from "react-dom";
import { loginWithKakao } from "@/lib/auth-actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="카카오 로그인"
      className="block w-full overflow-hidden rounded-xl transition-opacity duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-60"
    >
      {/* 카카오 디자인 가이드의 공식 버튼 이미지를 그대로 쓴다. (600×90, 2배 해상도) */}
      <Image
        src="/kakao_login_large_wide.png"
        alt=""
        width={600}
        height={90}
        priority
        className="h-auto w-full"
      />
    </button>
  );
}

/** 카카오 계정으로 로그인하는 버튼 */
export default function KakaoLoginButton() {
  return (
    <form action={loginWithKakao}>
      <SubmitButton />
    </form>
  );
}
