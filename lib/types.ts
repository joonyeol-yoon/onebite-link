export type Folder = {
  id: number;
  name: string;
};

export type Bookmark = {
  id: number;
  /** 폴더가 삭제되면 null이 된다. */
  folderId: number | null;
  title: string;
  url: string;
  description: string;
  /** 오픈 그래프 썸네일 주소 */
  image?: string | null;
};
