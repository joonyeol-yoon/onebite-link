import type { Metadata } from "next";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "로그인 | 한입 링크",
};

export default function LoginPage() {
  return <LoginForm />;
}
