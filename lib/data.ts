import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import type { Bookmark, Folder } from "./types";

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

/** folders 테이블에서 폴더 하나를 불러온다. 없으면 null을 반환한다. */
export async function getFolder(id: number): Promise<Folder | null> {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase
    .from("folders")
    .select("id, name")
    .eq("id", id)
    .maybeSingle();

  if (error) throw new Error(`폴더를 불러오지 못했어요: ${error.message}`);
  return data;
}

type LinkRow = {
  id: number;
  url: string;
  title: string | null;
  description: string | null;
  thumbnail_url: string | null;
  folder_id: number | null;
};

function toBookmark(row: LinkRow): Bookmark {
  return {
    id: row.id,
    folderId: row.folder_id,
    url: row.url,
    // title은 선택 컬럼이라 비어 있으면 주소의 도메인으로 대신한다.
    title: row.title || new URL(row.url).hostname.replace(/^www\./, ""),
    description: row.description ?? "",
    image: row.thumbnail_url,
  };
}

/** links 테이블의 링크를 최근에 추가한 순서대로 불러온다. folderId를 주면 그 폴더의 링크만 불러온다. */
export async function getLinks(folderId?: number): Promise<Bookmark[]> {
  const supabase = createClient(await cookies());
  let query = supabase
    .from("links")
    .select("id, url, title, description, thumbnail_url, folder_id")
    .order("id", { ascending: false });
  if (folderId !== undefined) query = query.eq("folder_id", folderId);

  const { data, error } = await query;
  if (error) throw new Error(`링크 목록을 불러오지 못했어요: ${error.message}`);
  return (data as LinkRow[]).map(toBookmark);
}
