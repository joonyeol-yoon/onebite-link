/**
 * 여러 컴포넌트가 함께 쓰는 Tailwind 클래스 묶음 (ULTRAFIT 디자인 가이드).
 * 색은 globals.css의 CSS 변수만 참조하고, hover는 globals.css의 클래스(btn-*)로 처리한다.
 */

const FIELD_BASE =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--bg)] px-4 text-[16px] text-[var(--title)] transition-colors duration-[400ms] ease-in-out placeholder:text-[var(--placeholder)] focus:border-[var(--title)] focus:outline-none aria-invalid:border-[var(--error)]";

/** 입력 필드: 높이 50px, radius 8px, 포커스 시 검정 보더 (글로우 없음) */
export const INPUT_CLASS = `${FIELD_BASE} h-[50px]`;

/** 여러 줄 입력 필드 */
export const TEXTAREA_CLASS = `${FIELD_BASE} resize-none py-3 leading-[1.625]`;

/** 셀렉트: 입력 필드와 같은 모양, 우측 화살표 자리 확보 */
export const SELECT_CLASS = `${FIELD_BASE} h-[50px] appearance-none pr-11 invalid:text-[var(--placeholder)]`;

/** 입력 필드 라벨 */
export const LABEL_CLASS = "text-[14px] font-medium text-[var(--title)]";

const BUTTON_BASE =
  "inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-8 text-[16px] font-medium disabled:cursor-not-allowed disabled:opacity-40";

/** 기본 버튼: 액센트 pill */
export const BUTTON_PRIMARY = `btn-primary ${BUTTON_BASE} bg-[var(--accent)] text-[var(--on-accent)]`;

/** 보조 버튼: 검정 아웃라인 pill (호버 시 반전) */
export const BUTTON_OUTLINE = `btn-outline ${BUTTON_BASE} border border-[var(--title)] text-[var(--title)]`;

/** 위험 버튼: 에러 컬러 pill */
export const BUTTON_DANGER = `btn-danger ${BUTTON_BASE} bg-[var(--error)] text-[var(--on-accent)]`;

/** 헤더용 작은 아웃라인 버튼: 높이 28px, radius 14px, 13px */
export const BUTTON_SMALL =
  "inline-flex h-7 items-center gap-1 rounded-[14px] border px-3.5 text-[13px] font-medium";

/** 모달 제목 (h2): 28px semibold */
export const MODAL_TITLE_CLASS =
  "text-[28px] leading-[1.2] font-semibold tracking-[-0.015em] text-[var(--title)]";
