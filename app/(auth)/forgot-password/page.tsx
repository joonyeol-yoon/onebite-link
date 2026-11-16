import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "비밀번호 찾기",
  description: "가입한 이메일로 비밀번호 재설정 링크를 받아 보세요.",
});

export default async function ForgotPasswordPage({ searchParams }: PageProps<"/forgot-password">) {
  const { error } = await searchParams;
  const initialError =
    error === "invalid_link"
      ? "재설정 링크가 만료되었거나 올바르지 않아요. 다시 요청해 주세요."
      : undefined;

  return <ForgotPasswordForm initialError={initialError} />;
}
