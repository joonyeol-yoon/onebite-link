import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Folder } from "./types";

/** folders 테이블의 폴더를 추가된 순서(id 오름차순)대로 불러온다. */
export async function getFolders(): Promise<Folder[]> {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("folders")
    .select("id, name")
    .order("id", { ascending: true });

  if (error) throw new Error(`폴더 목록을 불러오지 못했어요: ${error.message}`);
  return data;
}
