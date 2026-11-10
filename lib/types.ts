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
};
