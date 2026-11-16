import type { Metadata } from "next";
import SignupForm from "@/components/auth/signup-form";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "회원가입",
  description: "한입 링크에 가입하고 나만의 북마크를 폴더별로 정리해 보세요.",
});

export default function SignupPage() {
  return <SignupForm />;
}
