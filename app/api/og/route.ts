import type { NextRequest } from "next/server";
import { fetchOpenGraph, OpenGraphError } from "@/lib/og";

/**
 * GET /api/og?url=https://example.com
 * 지정한 페이지의 오픈 그래프 정보를 { url, title, description, image } 형태로 돌려준다.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return Response.json({ error: "url 쿼리 파라미터가 필요해요." }, { status: 400 });
  }

  try {
    return Response.json(await fetchOpenGraph(url));
  } catch (error) {
    if (error instanceof OpenGraphError) {
      return Response.json({ error: error.message }, { status: 422 });
    }
    return Response.json({ error: "페이지 정보를 가져오지 못했어요." }, { status: 502 });
  }
}
