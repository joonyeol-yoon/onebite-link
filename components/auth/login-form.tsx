"use client";

import { login } from "@/lib/auth-actions";
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
    autoComplete: "current-password",
  },
];

/** 로그인을 요청한다. 성공하면 서버에서 인덱스 페이지로 이동시키고, 실패하면 오류 메시지를 돌려준다. */
async function handleLogin(values: AuthValues) {
  try {
    const result = await login({ email: values.email, password: values.password });
    // 성공 시 서버에서 redirect하므로 결과가 비어 있을 수 있다.
    return result?.error;
  } catch {
    return "로그인에 실패했어요. 네트워크 상태를 확인해 주세요.";
  }
}

export default function LoginForm() {
  return (
    <AuthForm
      title="로그인"
      description="저장해 둔 링크를 보려면 로그인해 주세요."
      fields={FIELDS}
      submitLabel="로그인"
      pendingLabel="로그인하는 중…"
      onSubmit={handleLogin}
      footerText="아직 계정이 없으신가요?"
      footerLinkLabel="회원가입"
      footerHref="/signup"
    />
  );
}
