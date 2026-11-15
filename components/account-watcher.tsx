"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

type Props = {
  /** 서버가 이 화면을 그릴 때 기준으로 삼은 사용자 id */
  userId: string | null;
};

/**
 * 다른 탭에서 로그아웃하거나 다른 계정으로 로그인하면, 이 탭으로 돌아왔을 때 데이터를 처음부터 다시 불러온다.
 * 로그인 정보는 탭끼리 공유하는 쿠키에 있으므로, 탭이 다시 보일 때 쿠키의 사용자와 화면의 사용자를 비교한다.
 */
export default function AccountWatcher({ userId }: Props) {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    // focus와 visibilitychange가 함께 발생해도 한 번만 새로고침한다. (새 userId가 오면 effect가 다시 실행된다)
    let refreshed = false;

    async function checkAccount() {
      if (refreshed || document.visibilityState !== "visible") return;
      // getSession은 네트워크 요청 없이 쿠키만 읽는다. (권한 판단이 아니라 변경 감지용)
      const { data } = await supabase.auth.getSession();
      const currentId = data.session?.user.id ?? null;
      // 레이아웃까지 포함해 모든 데이터를 서버에서 새로 받는다. 로그아웃 상태면 proxy가 로그인 페이지로 보낸다.
      if (currentId !== userId && !refreshed) {
        refreshed = true;
        router.refresh();
      }
    }

    document.addEventListener("visibilitychange", checkAccount);
    window.addEventListener("focus", checkAccount);
    return () => {
      document.removeEventListener("visibilitychange", checkAccount);
      window.removeEventListener("focus", checkAccount);
    };
  }, [userId, router]);

  return null;
}
