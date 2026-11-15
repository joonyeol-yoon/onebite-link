"use client";

import { updatePassword } from "@/lib/auth-actions";
import AuthForm, { type AuthField, type AuthValues } from "./auth-form";

const FIELDS: AuthField[] = [
  {
    name: "password",
    label: "새 비밀번호",
    type: "password",
    placeholder: "새 비밀번호를 입력해 주세요",
    autoComplete: "new-password",
  },
  {
    name: "passwordConfirm",
    label: "새 비밀번호 확인",
    type: "password",
    placeholder: "새 비밀번호를 한 번 더 입력해 주세요",
    autoComplete: "new-password",
  },
];

/** 비밀번호 일치 여부를 확인한 뒤 새 비밀번호를 저장한다. 성공하면 서버에서 인덱스 페이지로 이동시킨다. */
async function handleReset(values: AuthValues) {
  if (values.password !== values.passwordConfirm) return "비밀번호가 일치하지 않아요.";

  try {
    const result = await updatePassword({
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    });
    // 성공 시 서버에서 redirect하므로 결과가 비어 있을 수 있다.
    return result?.error;
  } catch {
    return "비밀번호를 바꾸지 못했어요. 네트워크 상태를 확인해 주세요.";
  }
}

export default function ResetPasswordForm() {
  return (
    <AuthForm
      title="비밀번호 재설정"
      description="앞으로 사용할 새 비밀번호를 입력해 주세요."
      fields={FIELDS}
      submitLabel="비밀번호 변경"
      pendingLabel="변경하는 중…"
      onSubmit={handleReset}
      footerText="링크가 만료되었나요?"
      footerLinkLabel="다시 요청하기"
      footerHref="/forgot-password"
    />
  );
}
