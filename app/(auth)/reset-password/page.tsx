import type { Metadata } from "next";
import ResetPasswordForm from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "비밀번호 재설정 | 한입 링크",
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
