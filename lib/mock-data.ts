import type { Bookmark, Folder } from "./types";

export const folders: Folder[] = [
  { id: 1, name: "개발" },
  { id: 2, name: "디자인" },
  { id: 3, name: "읽을거리" },
  { id: 4, name: "도구" },
];

export const bookmarks: Bookmark[] = [
  {
    id: 1,
    folderId: 1,
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    description: "App Router, 서버 컴포넌트, 캐싱 등 Next.js의 모든 기능을 다루는 문서",
  },
  {
    id: 2,
    folderId: 1,
    title: "React",
    url: "https://react.dev",
    description: "React 공식 문서와 학습 가이드",
  },
  {
    id: 3,
    folderId: 1,
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "HTML, CSS, JavaScript 레퍼런스",
  },
  {
    id: 4,
    folderId: 2,
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    description: "유틸리티 우선 CSS 프레임워크",
  },
  {
    id: 5,
    folderId: 2,
    title: "Figma",
    url: "https://www.figma.com",
    description: "협업 기반 인터페이스 디자인 도구",
  },
  {
    id: 6,
    folderId: 3,
    title: "web.dev",
    url: "https://web.dev",
    description: "더 나은 웹을 만들기 위한 가이드와 아티클",
  },
  {
    id: 7,
    folderId: 4,
    title: "GitHub",
    url: "https://github.com",
    description: "코드 호스팅과 협업 플랫폼",
  },
  {
    id: 8,
    folderId: 4,
    title: "Vercel",
    url: "https://vercel.com",
    description: "프론트엔드 배포 및 호스팅 플랫폼",
  },
];
