import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import PageTitle from "@/components/page-title";
import LinkGrid from "@/components/link/link-grid";
import { getFolder, getFolders, getLinks } from "@/lib/data";

/** 주소의 id를 폴더 id로 바꾼다. 올바른 숫자가 아니면 null을 반환한다. */
function parseFolderId(id: string) {
  const folderId = Number(id);
  return Number.isInteger(folderId) && folderId > 0 ? folderId : null;
}

export async function generateMetadata({
  params,
}: PageProps<"/folder/[id]">): Promise<Metadata> {
  const folderId = parseFolderId((await params).id);
  const folder = folderId ? await getFolder(folderId) : null;
  return { title: folder ? `${folder.name} | 한입 링크` : "한입 링크" };
}

/** 폴더 정보와 그 폴더에 담긴 링크를 links 테이블에서 불러와 보여준다. */
async function FolderLinks({ params }: Pick<PageProps<"/folder/[id]">, "params">) {
  const folderId = parseFolderId((await params).id);
  if (!folderId) notFound();

  const [folder, bookmarks, folders] = await Promise.all([
    getFolder(folderId),
    getLinks(folderId),
    getFolders(),
  ]);
  if (!folder) notFound();

  return (
    <>
      <PageTitle description={`링크 ${bookmarks.length}개`}>{folder.name}</PageTitle>
      <LinkGrid bookmarks={bookmarks} folders={folders} />
    </>
  );
}

export default function FolderPage({ params }: PageProps<"/folder/[id]">) {
  return (
    <Suspense fallback={null}>
      <FolderLinks params={params} />
    </Suspense>
  );
}
