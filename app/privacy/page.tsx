import type { Metadata } from "next";
import Logo from "@/components/header/logo";
import { createMetadata, SITE_NAME } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "개인정보 처리방침",
  description: `${SITE_NAME}의 개인정보 처리방침 안내 페이지입니다.`,
});

const SERVICE_NAME = SITE_NAME;
// TODO: 실제 운영자명과 공개용 연락처 이메일로 바꿔 주세요. (개인정보 보호책임자로 표시됩니다)
const OPERATOR_NAME = "한입 링크 운영자";
const CONTACT_EMAIL = "privacy@example.com";

/** 시행일. 모듈이 처음 평가되는 시점(빌드·배포 시점)의 날짜로 정해진다. */
const EFFECTIVE_DATE = new Date().toISOString().slice(0, 10);

const SECTIONS = [
  "개인정보의 처리 목적",
  "처리하는 개인정보의 항목",
  "개인정보의 처리 및 보유 기간",
  "개인정보의 파기 절차 및 방법",
  "개인정보 처리업무의 위탁",
  "정보주체의 권리·의무 및 행사방법",
  "개인정보의 안전성 확보 조치",
  "개인정보 자동 수집 장치(쿠키)의 설치·운영 및 거부",
  "개인정보 보호책임자",
  "권익침해 구제방법",
  "개인정보 처리방침의 변경",
];

const REMEDY_AGENCIES = [
  { name: "개인정보분쟁조정위원회", tel: "1833-6972", url: "https://www.kopico.go.kr" },
  { name: "개인정보침해신고센터", tel: "118", url: "https://privacy.kisa.or.kr" },
  { name: "대검찰청", tel: "1301", url: "https://www.spo.go.kr" },
  { name: "경찰청", tel: "182", url: "https://ecrm.cyber.go.kr" },
];

const TEXT_LINK = "link-hover text-[var(--accent)] underline underline-offset-4";

function Section({ index, children }: { index: number; children: React.ReactNode }) {
  return (
    <section id={`s${index + 1}`} className="scroll-mt-10">
      <h2 className="mb-4 text-[22px] leading-[1.3] font-semibold text-[var(--title)]">
        {index + 1}. {SECTIONS[index]}
      </h2>
      <div className="flex flex-col gap-3">{children}</div>
    </section>
  );
}

function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[14px]">
        <thead className="bg-[var(--card)] text-left text-[var(--title)]">
          <tr>
            {head.map((cell) => (
              <th key={cell} className="border border-[var(--border)] px-3 py-2 font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={i} className="border border-[var(--border)] px-3 py-2 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const NOTE = "text-[14px] text-[var(--text-sub)]";
const LIST = "list-disc space-y-2 pl-6";
const OLIST = "list-decimal space-y-2 pl-6";

/** 로그인하지 않은 사용자도 볼 수 있는 개인정보 처리방침 페이지 */
export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-12 px-5 py-16 text-[var(--text)]">
      <Logo />

      <header className="flex flex-col gap-3 border-b border-[var(--divider)] pb-8">
        <h1 className="text-[36px] leading-[1.1] font-semibold tracking-[-0.015em] text-[var(--title)] md:text-[48px]">
          개인정보 처리방침
        </h1>
        <p className={NOTE}>
          시행일: <time dateTime={EFFECTIVE_DATE}>{EFFECTIVE_DATE}</time>
        </p>
      </header>

      <p>
        {SERVICE_NAME}(이하 &quot;서비스&quot;)은 정보주체의 자유와 권리 보호를 위해 「개인정보
        보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고
        있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보의 처리와 보호에 관한
        절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여
        다음과 같이 개인정보 처리방침을 수립·공개합니다.
      </p>

      <nav aria-label="목차" className="rounded-xl bg-[var(--card)] p-6">
        <h2 className="mb-3 font-semibold text-[var(--title)]">목차</h2>
        <ol className="list-decimal space-y-1 pl-5 text-[15px]">
          {SECTIONS.map((title, i) => (
            <li key={title}>
              <a href={`#s${i + 1}`} className="link-hover">
                {title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Section index={0}>
        <p>
          {SERVICE_NAME}은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의
          목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 「개인정보 보호법」
          제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
        </p>
        <ol className={OLIST}>
          <li>
            <strong>회원 가입 및 관리</strong>: 회원 가입 의사 확인, 본인 식별·인증, 회원자격
            유지·관리, 비밀번호 재설정, 서비스 부정이용 방지
          </li>
          <li>
            <strong>서비스 제공</strong>: 이용자가 저장한 링크와 폴더의 보관·조회·수정·삭제 기능 제공
          </li>
          <li>
            <strong>고충 처리</strong>: 정보주체의 문의사항 확인 및 사실조사를 위한 연락·통지,
            처리결과 통보
          </li>
        </ol>
      </Section>

      <Section index={1}>
        <Table
          head={["구분", "항목", "법적 근거"]}
          rows={[
            [
              "이메일 회원가입 (필수)",
              "이메일 주소, 비밀번호(단방향 암호화하여 저장하며 원문은 보관하지 않음)",
              "「개인정보 보호법」 제15조제1항제4호(계약 체결·이행)",
            ],
            [
              "카카오 로그인 (필수)",
              "카카오 계정 식별값, 카카오 계정 이메일, 닉네임, 프로필 사진 중 이용자가 카카오 동의 화면에서 제공에 동의한 항목",
              "「개인정보 보호법」 제15조제1항제4호(계약 체결·이행)",
            ],
            [
              "서비스 이용 시 이용자가 입력하는 정보",
              "저장한 링크의 주소·제목·설명·썸네일 이미지 주소, 폴더 이름",
              "「개인정보 보호법」 제15조제1항제4호(계약 체결·이행)",
            ],
            [
              "서비스 이용 과정에서 자동 수집",
              "IP 주소, 쿠키, 서비스 이용 기록, 접속 로그, 브라우저 정보, 기기 정보",
              "「개인정보 보호법」 제15조제1항제6호(정당한 이익)",
            ],
          ]}
        />
      </Section>

      <Section index={2}>
        <p>
          {SERVICE_NAME}은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에
          동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
        </p>
        <Table
          head={["처리 목적", "보유 기간"]}
          rows={[
            ["회원 가입 및 관리", "회원 탈퇴 시까지"],
            ["서비스 제공(저장한 링크·폴더)", "이용자가 삭제하거나 회원 탈퇴 시까지"],
            ["고충 처리", "고충 처리 완료 시까지"],
          ]}
        />
        <p className={NOTE}>
          다만, 관계 법령 위반에 따른 수사·조사가 진행 중인 경우 또는 관련 법령에 따른 보존 의무가 있는
          경우에는 해당 기간 종료 시까지 보유합니다.
        </p>
      </Section>

      <Section index={3}>
        <p>
          {SERVICE_NAME}은 개인정보 보유기간의 경과, 처리목적 달성으로 개인정보가 불필요하게 되었을
          때에는 지체 없이 해당 개인정보를 파기합니다.
        </p>
        <ul className={LIST}>
          <li>
            <strong>파기 절차</strong>: 이용자의 회원 탈퇴 요청 또는 보유기간 만료 시 즉시 파기
          </li>
          <li>
            <strong>파기 방법</strong>: 전자적 파일은 복구 및 재생이 불가능한 방법으로 영구 삭제
          </li>
        </ul>
      </Section>

      <Section index={4}>
        <p>
          {SERVICE_NAME}은 원활한 서비스 운영을 위해 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
          모든 수탁업체는 대한민국 리전(Seoul)에서 개인정보를 저장·처리하고 있습니다.
        </p>
        <Table
          head={["수탁업체", "위탁 업무", "처리 지역", "보유·이용 기간"]}
          rows={[
            [
              "Supabase Inc.",
              "회원 정보 저장 및 인증 처리, 회원가입 확인·비밀번호 재설정 메일 발송, 데이터베이스 운영",
              "대한민국 (Seoul 리전)",
              "회원 탈퇴 또는 위탁계약 종료 시까지",
            ],
            [
              "Vercel Inc.",
              "웹 서비스 호스팅 및 배포",
              "대한민국 (Seoul Edge)",
              "위탁계약 종료 시까지",
            ],
          ]}
        />
        <p className={NOTE}>
          {SERVICE_NAME}은 「개인정보 보호법」 제26조에 따라 위탁계약 시 개인정보의 안전한 처리를 위한
          기술적·관리적 보호조치, 재위탁 제한, 관리·감독에 관한 책임 사항을 계약에 반영하고 있습니다.
        </p>
      </Section>

      <Section index={5}>
        <p>정보주체는 {SERVICE_NAME}에 대해 언제든지 다음과 같은 개인정보 보호 관련 권리를 행사할 수 있습니다.</p>
        <ol className={OLIST}>
          <li>개인정보 열람 요구</li>
          <li>개인정보 정정·삭제 요구</li>
          <li>개인정보 처리정지 요구</li>
          <li>개인정보 처리에 대한 동의 철회</li>
        </ol>
        <p>
          권리 행사는{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className={TEXT_LINK}>
            {CONTACT_EMAIL}
          </a>
          로 서면 또는 이메일을 통하여 하실 수 있으며 {SERVICE_NAME}은 이에 대해 지체 없이
          조치하겠습니다.
        </p>
      </Section>

      <Section index={6}>
        <ul className={LIST}>
          <li>
            <strong>기술적 조치</strong>: 접근 권한 관리, 비밀번호 단방향 암호화 저장, HTTPS 통신
            암호화, 본인 데이터만 조회할 수 있도록 Row Level Security(RLS) 적용
          </li>
          <li>
            <strong>관리적 조치</strong>: 개인정보 취급 담당자 최소화, 정기적인 자체 점검
          </li>
          <li>
            <strong>물리적 조치</strong>: 국제 보안 인증(SOC 2)을 획득한 클라우드 인프라를 대한민국
            리전에서 활용
          </li>
        </ul>
      </Section>

      <Section index={7}>
        <p>{SERVICE_NAME}은 로그인 상태 유지를 위해 쿠키(cookie)를 사용합니다.</p>
        <ul className={LIST}>
          <li>
            <strong>사용 목적</strong>: 로그인 세션 유지
          </li>
          <li>
            <strong>거부 방법</strong>: 웹브라우저 설정 &gt; 개인정보 보호 및 보안 메뉴에서 쿠키 저장을
            거부할 수 있습니다. 다만, 쿠키 저장을 거부할 경우 로그인이 필요한 서비스를 이용할 수
            없습니다.
          </li>
        </ul>
      </Section>

      <Section index={8}>
        <p>
          {SERVICE_NAME}은 개인정보 처리에 관한 업무를 총괄하여 책임지고, 개인정보 처리와 관련한
          정보주체의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
        </p>
        <div className="rounded-xl bg-[var(--card)] p-5">
          <p>
            <strong>개인정보 보호책임자</strong>: {OPERATOR_NAME}
          </p>
          <p>
            <strong>연락처</strong>:{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={TEXT_LINK}>
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </Section>

      <Section index={9}>
        <p>
          정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁 해결이나 상담을 신청할 수
          있습니다.
        </p>
        <ul className="list-disc space-y-1 pl-6">
          {REMEDY_AGENCIES.map(({ name, tel, url }) => (
            <li key={name}>
              {name}: (국번없이) {tel} (
              <a href={url} target="_blank" rel="noreferrer noopener" className={TEXT_LINK}>
                {url.replace("https://", "")}
              </a>
              )
            </li>
          ))}
        </ul>
      </Section>

      <Section index={10}>
        <p>
          이 개인정보 처리방침은 {EFFECTIVE_DATE}부터 적용됩니다. 법령, 정책 또는 보안기술 변경에 따라
          내용이 추가·삭제 및 수정될 경우 변경 사항을 시행일 7일 전부터 서비스 내 공지사항을 통해
          고지합니다.
        </p>
      </Section>
    </main>
  );
}
