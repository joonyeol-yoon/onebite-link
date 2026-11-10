import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageTitle from "@/components/page-title";
import LinkGrid from "@/components/link/link-grid";
import { bookmarks, folders } from "@/lib/mock-data";

export function generateStaticParams() {
  return folders.map((folder) => ({ id: String(folder.id) }));
}

function findFolder(id: string) {
  return folders.find((folder) => String(folder.id) === id);
}

export async function generateMetadata({
  params,
}: PageProps<"/folder/[id]">): Promise<Metadata> {
  const folder = findFolder((await params).id);
  return { title: folder ? `${folder.name} | 한입 링크` : "한입 링크" };
}

export default async function FolderPage({ params }: PageProps<"/folder/[id]">) {
  const folder = findFolder((await params).id);
  if (!folder) notFound();

  const folderBookmarks = bookmarks.filter((b) => b.folderId === folder.id);

  return (
    <>
      <PageTitle description={`링크 ${folderBookmarks.length}개`}>{folder.name}</PageTitle>
      <LinkGrid bookmarks={folderBookmarks} folders={folders} />
    </>
  );
}
