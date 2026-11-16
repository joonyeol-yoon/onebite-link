import type { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "로그인",
  description: "한입 링크에 로그인하고 저장한 북마크를 확인하세요.",
});

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { error } = await searchParams;
  const initialError =
    error === "oauth" ? "카카오 로그인에 실패했어요. 다시 시도해 주세요." : undefined;

  return <LoginForm initialError={initialError} />;
}
