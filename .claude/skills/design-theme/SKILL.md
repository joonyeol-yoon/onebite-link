---
name: design-theme
description: ULTRAFIT 스타일 UI 디자인 가이드. 블랙·화이트 고대비에 블루 포인트를 쓰는 프리미엄 자동차 필름 브랜드 느낌. UI 스타일링, CSS, 디자인 작업 시 사용.
---

# ULTRAFIT Style Design Guide

> 출처: ultrafitprotection.com/en 의 CSS(layout.css, main.css, content.css)에서 추출한 값을 웹 앱 UI 크기에 맞게 옮김.
> 원본 사이트는 `html { font-size: 10px }` 기준 rem을 쓰므로 `1.6rem = 16px` 로 환산했다.

## 컬러 (라이트모드 — 기본값)

- 배경: #FFFFFF
- 카드/컨테이너 배경: #F5F5F5
- 강조 표면(다크 박스, 표 헤더, 강조 셀렉트): #232323
- 텍스트 기본(제목): #000000
- 텍스트 본문: #232323
- 텍스트 보조: #666666
- 플레이스홀더: #8A8A8A (원본 #999는 흰 배경 대비 2.8:1이라 3:1에 맞춰 조정)
- 보더: #DDDDDD
- 액센트(버튼, 링크): #1D7AD6
- 액센트 호버: #277CD1
- 구분선: #E5E5E5
- 에러: #D93025
- 경고/카테고리 포인트: #E88419
- 성공: #24A00D (원본 #2FC911은 흰 배경 대비가 낮아 텍스트용으로 어둡게 조정)

## 컬러 (다크모드)

- 배경: #000000
- 카드/컨테이너 배경: #111111 (원본: rgba(255,255,255,0.05) 오버레이)
- 강조 표면: #232323
- 텍스트 기본(제목): #FFFFFF
- 텍스트 본문: #FFFFFF
- 텍스트 보조: #B3B3B3 (원본: rgba(255,255,255,0.7))
- 플레이스홀더: #808080 (원본: rgba(255,255,255,0.5))
- 보더: #333333
- 액센트(버튼, 링크): #3890E9
- 액센트 호버: #3A94EC
- 구분선: #1A1A1A (원본: rgba(255,255,255,0.1))
- 에러: #FF6B5E
- 경고/카테고리 포인트: #E88419
- 성공: #2FC911

## 타이포그래피

- 폰트: 'Poppins'(영문·숫자) + 'Pretendard'(한글), 대체 폰트 "나눔고딕", Arial, sans-serif
  - Google Fonts `Poppins` 300–900, CDN `pretendard-dynamic-subset`
  - 보조 디스플레이 폰트: 'Outfit' (숫자·영문 큰 타이틀에 선택적으로 사용)
- 제목(h1): 48px, semibold(600), line-height: 1.1, letter-spacing: -0.015em
- 부제목(h2): 28px, semibold(600), line-height: 1.2, letter-spacing: -0.015em
- 본문: 16px, regular(400), line-height: 1.625, letter-spacing: -0.015em
- 보조 텍스트: 13–14px, medium(500), line-height: 1.4, 보조 컬러
- 링크: 텍스트 기본 컬러, underline 없음, 호버 시 액센트 컬러로 변경
- 한글 줄바꿈: `word-break: keep-all`
- 제목은 크고 굵게, 모든 텍스트에 -0.015em 자간 (ULTRAFIT 특유의 단단한 인상)

## 레이아웃

- 최대 너비: 1320px, 가운데 정렬 (넓은 영역 1640px)
- 페이지 좌우 패딩: 30px (모바일 20px)
- 페이지 상단 패딩: 80px
- 섹션 간 간격: 100px (모바일 60px)
- 요소 간 간격: 20px
- 카드 그리드 간격: 25px

## 컴포넌트

### 카드

- 이미지 중심 카드: 이미지 영역 border-radius 24px, overflow hidden, 정사각형(1:1) 비율
- 배경 #F5F5F5(라이트) / #111111(다크), 보더 없음, 그림자 없음
- 텍스트는 이미지 아래에 배치 (margin-top 20px): 제목 27px semibold, 메타 정보 13px medium + opacity 0.5, 항목 사이 1px 세로 구분선
- 호버 시: 우측 상단(14px 여백)에 ↗ 화살표 아이콘이 서서히 나타나고, 보조 이미지가 겹쳐 보이는 정도로만 변화 (transition 0.3s)

### 버튼

- 기본: 액센트 컬러 배경, 흰색 텍스트, border-radius 32px(pill), 높이 64px, 좌우 패딩 35–43px, font-size 17px, weight 500
  - 텍스트는 좌측, 화살표 아이콘은 우측 (justify-content: space-between)
- 호버: 액센트 호버 컬러, transition 0.4s
- 비활성: opacity 0.4, cursor not-allowed
- 보조 버튼(아웃라인): 투명 배경, 1px 보더 + 같은 색 텍스트(#000 또는 액센트), pill
  - 호버 시 배경이 보더 컬러로 채워지고 텍스트는 흰색으로 반전
- 작은 버튼(헤더 등): 높이 28px, border-radius 14px, font-size 13px, weight 500, 아웃라인 스타일
- 원형 CTA(선택): 지름 110–144px 원형, 반투명 검정 배경 rgba(0,0,0,0.3) + backdrop-filter blur(10px), 2px 흰색 링. 호버 시 링이 1.5배로 퍼지며 사라짐

### 입력 필드

- 1px 보더(보더 컬러), border-radius 8px, 높이 50px, 좌우 패딩 16px, font-size 15–16px
- 포커스: 보더 컬러 → 텍스트 기본 컬러(#000), 글로우 없음 (흑백 대비로 강조)
- 플레이스홀더: 플레이스홀더 컬러
- 에러 상태: 보더 컬러 → 에러 컬러

### 셀렉트

- 기본: 입력 필드와 동일한 스타일, 화살표 아이콘 우측 배치
- 강조형: 배경 #232323, 흰색 텍스트, border-radius 8px, 높이 45px, font-size 16px weight 500
  - 펼쳐지면 목록도 #232323, 하단 모서리만 둥글게(0 0 8px 8px)

### 뱃지/태그

- 아웃라인 뱃지: 투명 배경, 2px 보더 + 같은 색 텍스트 (예: #E88419, #2FC911, 액센트)
- border-radius 20px, 패딩 4px 12px, font-size 13px, weight 600
- 중립 뱃지: 배경 #F3F3F3(라이트) / #232323(다크), 텍스트 기본 컬러

### 리스트 아이템

- 아이템 간 1px 구분선(구분선 컬러)
- 패딩 상하 20px
- 활성/선택 항목: 제목을 액센트 컬러로, 하단에 1px 액센트 라인
- 호버 시 텍스트가 액센트 컬러로 변경

### 네비게이션

- 페이지 상단 고정, 스크롤 시 반투명 배경 + 강한 블러(backdrop-filter: blur(30px))
- 배경: rgba(255,255,255,0.8)(라이트) / rgba(0,0,0,0.35)(다크)
- 높이 72px(원본 120px, 앱 UI용 축소), 좌우 패딩 30px, 내부 최대 너비 1640px
- 하단 구분선 없음 (배경 블러로 영역 구분)
- 로고: 가로 약 194px × 48px 이미지 또는 20px bold 워드마크
- 언어/유틸 버튼: 반투명 pill (rgba(255,255,255,0.1) + blur), border-radius 15px, font-size 14px weight 600

### 푸터

- 배경 #000, 텍스트 흰색/보조 rgba(255,255,255,0.5)
- 상단 영역 패딩 90px 0 50px, 하단 1px 구분선 rgba(255,255,255,0.1)

## 트랜지션

- 색상·배경 변경: transition 0.4s ease-in-out
- 아이콘·오버레이 페이드: 0.3s
- 스크롤 등장 효과: opacity 0 → 1, translateY(30px) → 0, 0.8s ease-in-out
- 헤더 상태 전환(배경, 위치): 0.8s ease-in-out

## 스타일 원칙

- 블랙 & 화이트 고대비, 프리미엄 자동차 브랜드 느낌
- 액센트 블루(#1D7AD6)는 CTA·활성 상태·강조 라인에만 사용
- 사진/이미지가 주인공, UI는 이미지를 돋보이게 하는 역할
- 큰 둥근 모서리(이미지 24px, 버튼 pill)로 단단하면서도 부드러운 인상
- 다크 영역에는 반투명 유리(블러) 효과
- 제목은 크고 굵게, 자간은 좁게(-0.015em)
- 여백은 넉넉하게, 섹션 간 간격을 크게

## 구현 규칙 (MUST FOLLOW)

- **배경과 텍스트 명암비는 최소 3:1을 유지한다** — 보조 텍스트(text-sub)도 포함. 명암비가 낮으면 색을 어둡게 조정한다.
- **라이트모드만 구현한다** — 다크모드(`@media (prefers-color-scheme: dark)`, `.dark` 클래스 등) 는 추가하지 않는다.

- **CSS 변수는 `globals.css`에 정의하고, Tailwind arbitrary value로만 참조한다** — `bg-[var(--accent)]`, `text-[var(--text-sub)]` 형태로 사용. `style={{ color: "var(--text)" }}` 같은 inline style과 절대 혼용하지 않는다.
- **hover 효과는 반드시 `globals.css`에 CSS 클래스로 정의한다** — Next.js 서버 컴포넌트에서는 `onMouseEnter`/`onMouseLeave` 같은 JS 이벤트 핸들러를 사용할 수 없다. 예: `.card-hover:hover { background: var(--hover-bg); }`
- **서버 컴포넌트 props에 이벤트 핸들러(onClick 등)를 넘기지 않는다** — 인터랙션이 필요하면 `"use client"` 컴포넌트로 분리한다.
- **스타일링 방식을 한 가지로 통일한다** — Tailwind를 쓰기로 했으면 Tailwind만, inline style을 쓰기로 했으면 inline style만. 한 컴포넌트 안에서 두 방식을 섞지 않는다.
