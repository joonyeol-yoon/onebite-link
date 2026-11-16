"use client";

import { signup } from "@/lib/auth-actions";
import AuthForm, { type AuthField, type AuthValues } from "./auth-form";

const FIELDS: AuthField[] = [
  {
    name: "email",
    label: "이메일",
    type: "email",
    placeholder: "example@email.com",
    autoComplete: "email",
  },
  {
    name: "password",
    label: "비밀번호",
    type: "password",
    placeholder: "비밀번호를 입력해 주세요",
    autoComplete: "new-password",
  },
  {
    name: "passwordConfirm",
    label: "비밀번호 확인",
    type: "password",
    placeholder: "비밀번호를 한 번 더 입력해 주세요",
    autoComplete: "new-password",
  },
];

/** 비밀번호 일치 여부를 먼저 확인한 뒤 회원가입을 요청한다. 성공하면 서버에서 인덱스 페이지로 이동시킨다. */
async function handleSignup(values: AuthValues) {
  if (values.password !== values.passwordConfirm) return "비밀번호가 일치하지 않아요.";

  try {
    const result = await signup({
      email: values.email,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    });
    // 성공 시 서버에서 redirect하므로 결과가 비어 있을 수 있다.
    return result?.error;
  } catch {
    return "회원가입에 실패했어요. 네트워크 상태를 확인해 주세요.";
  }
}

export default function SignupForm() {
  return (
    <AuthForm
      title="회원가입"
      description="이메일로 가입하고 나만의 링크를 정리해 보세요."
      fields={FIELDS}
      submitLabel="회원가입"
      pendingLabel="가입하는 중…"
      onSubmit={handleSignup}
      footerText="이미 계정이 있으신가요?"
      footerLinkLabel="로그인"
      footerHref="/login"
      secondaryLink={{ href: "/privacy", label: "개인정보 처리방침" }}
    />
  );
}
