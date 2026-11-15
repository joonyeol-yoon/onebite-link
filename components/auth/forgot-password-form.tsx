"use client";

import Link from "next/link";
import { useState } from "react";
import { sendPasswordResetEmail } from "@/lib/auth-actions";
import { BUTTON_OUTLINE } from "@/lib/ui";
import AuthForm, { type AuthField, type AuthValues } from "./auth-form";

const FIELDS: AuthField[] = [
  {
    name: "email",
    label: "이메일",
    type: "email",
    placeholder: "가입한 이메일을 입력해 주세요",
    autoComplete: "email",
  },
];

type Props = {
  /** 재설정 링크가 만료됐거나 잘못된 경우 보여 줄 오류 메시지 */
  initialError?: string;
};

/** 이메일을 받아 비밀번호 재설정 링크를 보낸다. 발송에 성공하면 안내 화면으로 바뀐다. */
export default function ForgotPasswordForm({ initialError }: Props) {
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function handleSend(values: AuthValues) {
    try {
      const result = await sendPasswordResetEmail({ email: values.email });
      if (result?.error) return result.error;
      setSentTo(values.email.trim());
    } catch {
      return "재설정 메일을 보내지 못했어요. 네트워크 상태를 확인해 주세요.";
    }
  }

  if (sentTo) {
    return (
      <div className="flex w-full flex-col gap-8 text-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-[32px] leading-[1.2] font-semibold tracking-[-0.015em] text-[var(--title)]">
            메일을 확인해 주세요
          </h1>
          <p className="text-[16px] text-[var(--text-sub)]">
            <span className="font-medium break-all text-[var(--title)]">{sentTo}</span>
            으로 비밀번호 재설정 링크를 보냈어요. 메일의 링크를 눌러 새 비밀번호를 설정해 주세요.
          </p>
          <p className="text-[14px] text-[var(--text-sub)]">
            메일이 오지 않았다면 스팸함을 확인하거나 잠시 후 다시 시도해 주세요.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Link href="/login" className={`${BUTTON_OUTLINE} w-full`}>
            로그인으로 돌아가기
          </Link>
          <button
            type="button"
            onClick={() => setSentTo(null)}
            className="link-hover text-[14px] text-[var(--text-sub)]"
          >
            다른 이메일로 다시 보내기
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthForm
      title="비밀번호 찾기"
      description="가입한 이메일을 입력하면 비밀번호 재설정 링크를 보내 드려요."
      fields={FIELDS}
      submitLabel="재설정 링크 보내기"
      pendingLabel="보내는 중…"
      onSubmit={handleSend}
      initialError={initialError}
      footerText="비밀번호가 기억나셨나요?"
      footerLinkLabel="로그인"
      footerHref="/login"
    />
  );
}
