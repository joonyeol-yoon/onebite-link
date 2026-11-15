import { cookies } from "next/headers";
import { cache } from "react";
import { createClient } from "@/utils/supabase/server";

/**
 * 현재 로그인한 사용자의 id. 로그인하지 않았으면 null.
 * 한 요청 안에서 레이아웃·페이지가 여러 번 불러도 인증 서버에는 한 번만 묻도록 React cache로 묶는다.
 * (요청마다 새로 계산하므로 계정이 바뀌면 바로 새 사용자 기준으로 데이터를 불러온다.)
 */
export const getCurrentUserId = cache(async (): Promise<string | null> => {
  const supabase = createClient(await cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user?.id ?? null;
});
