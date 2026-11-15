import Logo from "@/components/header/logo";

/** 로그인·회원가입 페이지: 헤더·사이드바 없이 화면 가운데에 폼만 보여 준다. */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-5 py-16">
      <div className="flex w-full max-w-[400px] flex-col items-center gap-10">
        <Logo />
        {children}
      </div>
    </main>
  );
}
