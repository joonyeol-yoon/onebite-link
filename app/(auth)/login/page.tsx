import type { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "로그인 | 한입 링크",
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const { error } = await searchParams;
  const initialError =
    error === "oauth" ? "카카오 로그인에 실패했어요. 다시 시도해 주세요." : undefined;

  return <LoginForm initialError={initialError} />;
}
