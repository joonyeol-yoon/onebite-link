import type { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "비밀번호 재설정",
  description: "한입 링크 계정의 새 비밀번호를 설정하세요.",
});

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
