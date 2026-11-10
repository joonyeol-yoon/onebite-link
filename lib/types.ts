export type Folder = {
  id: number;
  name: string;
};

export type Bookmark = {
  id: number;
  folderId: number;
  title: string;
  url: string;
  description: string;
  /** 오픈 그래프 썸네일 주소 */
  image?: string | null;
};
