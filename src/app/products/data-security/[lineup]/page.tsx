import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { TabLink } from "@/components/ui/tab-link";
import { getSiteContent } from "@/lib/content/site";

type LineupSlug = "on-application" | "on-db" | "on-os";

type DetailBlock = {
  heading?: string;
  items: string[];
};

type DetailCard = {
  title: string;
  blocks: DetailBlock[];
};

type LineupDetail = {
  slug: LineupSlug;
  label: string;
  description: string;
  cards: DetailCard[];
};

const lineups: LineupDetail[] = [
  {
    slug: "on-application",
    label: "D.AMO onApplication",
    description:
      "Application 서버에 설치한 API를 이용하여 암호화 수행 후 DBMS에 쿼리를 전송하는 방식으로, 암/복호화 시 DBMS 부하를 최소화하며 다양한 OS 및 DBMS를 지원하는 뛰어난 호환성을 지닙니다.",
    cards: [
      {
        title: "안전한 암호 알고리즘 사용",
        blocks: [
          {
            items: [
              "안전한 암호 알고리즘 사용",
              "자체 개발한 국가정보원 검증필 암호모듈 사용 (CIS-CC)",
              "미연방정보처리표준(FIPS)에 의한 인증 획득 (AES, TDES 인증)",
              "국내외 표준 알고리즘 모두 지원 (SEED, ARIA, AES, TDES, SHA, BLOWFISH 등)",
              "각 모듈은 인터페이스가 달라도 내부에 탑재된 동일한 모듈의 암호엔진 사용으로 강력한 호환성 제공",
            ],
          },
        ],
      },
      {
        title: "주요 기능",
        blocks: [
          {
            heading: "DBMS 부하 분산 처리",
            items: [
              "암/복호화를 어플리케이션에서 수행하므로 암호화 대상 DBMS 서버의 부하를 어플리케이션에서 분산 처리",
              "HA 장비 간 자동 정책 동기화 기능 지원",
            ],
          },
          {
            heading: "인덱스 칼럼의 색인기능 및 선택적 암호화 기능 지원",
            items: [
              "인덱스 칼럼 암호화 후에도 기존의 Index Search 유지",
              "암호화에 따른 Application 변경 없음",
              "부분 암호화를 활용한 암호화 컬럼의 인덱스 검색 지원 (일치검색, 범위검색)",
            ],
          },
          {
            heading: "대용량 데이터 일괄 암호화 지원",
            items: [
              "대용량 일괄 암호화는 DBMS에서 파일 형태로 export 하여 그 파일을 암호화한 후 DBMS에 저장하는 방식",
              "일괄 암호화를 DBMS가 아닌 Application에서 처리하므로 속도가 빠름",
              "일괄 암호화에 따른 DBMS 부하가 적음",
            ],
          },
        ],
      },
      {
        title: "기술적 차별점",
        blocks: [
          {
            heading: "뛰어난 성능 및 네트워크 구간의 안정성 보장",
            items: [
              "DBMS가 아닌 별도의 Application 서버에서 암/복호화를 수행하므로 기존 DBMS에 추가 부하 없음",
              "Application과 DBMS 사이 전송 구간에서 암호화된 데이터 전송으로 안정성 확보",
            ],
          },
          {
            heading: "강력한 키 관리 및 관리자 인증",
            items: [
              "하이브리드 암호화 방식으로 암/복호화 키 이중 암호화",
              "별도 H/W를 통한 강력한 키 관리 기능 지원 (D.AMO KMS 적용 시)",
            ],
          },
          {
            heading: "다양한 알고리즘 및 환경 지원 (유연성·확장성)",
            items: [
              "국내외 표준 암호화 알고리즘 지원 (RSA, 3DES, AES, SEED, ARIA, SHA 등)",
              "모든 Application 개발 환경(C, Java 등) 및 모든 종류의 DBMS 지원 (Oracle, Altibase, MSSQL, DB2 등)",
              "이기종 DBMS 간 데이터 연동 시 암호키가 다른 경우도 안전하게 연동 가능",
              "관리 대상 DBMS 추가 시 D.AMO SCP Agent 설치만으로 기존 관리체계에 통합 가능",
            ],
          },
          {
            heading: "다양한 라이브러리 제공으로 개발 편의성 제공",
            items: ["다양한 함수·라이브러리 제공으로 개발자 환경을 폭넓게 지원하여 편의성 극대화"],
          },
          {
            heading: "높은 관리 편의성 지원",
            items: [
              "GUI 방식의 통합 관리도구 제공",
              "편리한 사용자 인터페이스 제공",
              "관리자 시스템에서 간편한 키 관리 및 설정 기능 제공 (KMS 적용 시)",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "on-db",
    label: "D.AMO onDB",
    description:
      "DB 서버에 Package, Engine, DBMS API 등의 형태로 Agent를 설치하여 암/복호화를 수행하고, 접근 제어·감사 기록·권한 분리 기능을 통해 통합 DB 보안을 제공합니다.",
    cards: [
      {
        title: "Package 설치형 암호화",
        blocks: [
          {
            heading: "VTI 암호화 모드 / API 암호화 모드 지원",
            items: [
              "고객 환경 및 성능, 지원 환경에 따라 두 가지 암호화 모드 지원",
              "VTI(View/Trigger Interface) 모드: View와 Trigger를 이용해 암호화 수행 (암호화 테이블·컬럼명 변경)",
              "API(Application Programming Interface) 모드: View·Trigger 없이 암호화 수행 (테이블·컬럼명 변경 없음)",
            ],
          },
          {
            heading: "암호화 정책을 통한 컬럼 단위 선택적 암호화",
            items: [
              "암호화 알고리즘, 운영 모드, 부분 암호화 등을 정책으로 효율적으로 설정",
              "필요한 데이터만 암호화하여 성능 저하 최소화 및 보안성 확보",
            ],
          },
          {
            heading: "DB 전체 및 암호화 컬럼 접근제어",
            items: ["DB 계정 / IP / MAC / Application / 시간 / 요일별 접근제어 제공"],
          },
          {
            heading: "장애 발생 시 암호화 데이터 복구 가능",
            items: [
              "Site / Console / DB 키는 백업해 둔 키 사용",
              "복구 완료 시 장애 이전과 동일하게 복호화 및 신규 데이터 암호화 가능",
              "키만 정상 백업되면 SA 버전과 무관하게 데이터 복구 가능",
            ],
          },
          {
            heading: "서비스 중단 없는 암호화",
            items: ["별도 사본 테이블에서 암호화 적용 후 서비스 테이블로 전환하여 중단 최소화"],
          },
          {
            heading: "사용자 친화적인 관리도구 제공",
            items: [
              "직관적인 메뉴 체계와 다양한 아이콘 활용",
              "다수의 Security Agent를 하나의 관리도구에서 통합 관리",
            ],
          },
          {
            heading: "최적화 지원 DBMS",
            items: ["Oracle, MS SQL Server"],
          },
        ],
      },
      {
        title: "Engine 설치형 암호화",
        blocks: [
          {
            heading: "Application에 대한 독립성",
            items: [
              "DBMS 내부에 설치·작동하여 기존 Application에 영향 없음",
              "Encryption Engine 삽입 외 DB 환경 변화 없음 (테이블·컬럼명 변경 없음)",
            ],
          },
          {
            heading: "컬럼 단위 선택적 암호화 지원",
            items: [
              "데이터 중요도에 따라 중요한 컬럼만 암호화",
              "전체 암호화가 필요한 파일암호화 대비 효율·성능 우위",
            ],
          },
          {
            heading: "인덱스 칼럼의 색인기능 및 선택적 암호화 지원",
            items: [
              "인덱스 칼럼 암호화 후에도 기존 Index Search 유지",
              "암호화에 따른 Application 변경 없음",
              "부분 암호화를 활용한 컬럼 인덱스 검색 지원 (일치·범위 검색)",
            ],
          },
          {
            heading: "권한 분리 및 접근 제어",
            items: [
              "인가받지 못한 DB 관리자는 복호화 불가 (보안관리자가 DB 관리자 권한 제어)",
              "DB 관리자와 보안 관리자의 철저한 권한 분리",
            ],
          },
          {
            heading: "최적화 지원 DBMS",
            items: ["MySQL, MariaDB"],
          },
        ],
      },
      {
        title: "API 설치형 암호화",
        blocks: [
          {
            heading: "인덱스 칼럼의 색인기능 및 선택적 암호화 지원",
            items: [
              "인덱스 칼럼 암호화 후에도 기존 Index Search 유지",
              "암호화에 따른 Application 변경 없음",
              "부분 암호화를 활용한 컬럼 인덱스 검색 지원 (일치·범위 검색)",
            ],
          },
          {
            heading: "대용량 데이터 일괄 암호화 지원",
            items: [
              "DBMS에서 파일로 export 후 암호화하여 DBMS에 저장하는 방식",
              "DBMS가 아닌 Application에서 처리하므로 속도가 빠름",
              "일괄 암호화에 따른 DBMS 부하가 적음",
            ],
          },
          {
            heading: "개발자 편의성 제공",
            items: [
              "다양한 언어 기반 함수·라이브러리 제공으로 개발 편의성 증대",
              "최소한의 수정개발로 반영 가능한 API 함수 제공",
            ],
          },
          {
            heading: "강력한 키 관리 및 관리자 인증",
            items: [
              "하이브리드 암호화 방식으로 암/복호화 키 이중 암호화",
              "별도 H/W를 통한 강력한 키 관리 기능 지원 (D.AMO KMS 적용 시)",
            ],
          },
          {
            heading: "다양한 알고리즘 및 환경 지원 (유연성·확장성)",
            items: [
              "국내외 표준 암호화 알고리즘 지원 (RSA, 3DES, AES, SEED, ARIA, SHA 등)",
              "모든 Application 개발 환경 및 모든 종류의 DBMS 지원",
              "이기종 DBMS 간 연동 시 암호키가 달라도 안전하게 연동",
              "관리 대상 DBMS 추가 시 D.AMO SCP Agent 설치만으로 통합 가능",
            ],
          },
          {
            heading: "높은 관리 편의성 지원",
            items: [
              "관리자 시스템에서 간편한 키 관리 및 설정",
              "직관적인 GUI 및 CLI 제공",
              "콘솔을 통한 정책 설정 및 로그·시스템 현황 확인",
            ],
          },
          {
            heading: "최적화 지원 DBMS",
            items: ["Oracle, MS SQL, MySQL, PostgreSQL, Tibero, Cubrid, Sybase, Altibase, DB2 등"],
          },
        ],
      },
    ],
  },
  {
    slug: "on-os",
    label: "D.AMO onOS",
    description:
      "OS 커널 레벨에 Agent를 설치하여 정형/비정형 데이터의 암호화를 수행합니다. 파일 시스템 레벨에서 데이터를 보호하여 다양한 형태의 데이터 보안을 지원합니다.",
    cards: [
      {
        title: "주요 기능",
        blocks: [
          {
            heading: "커널 레벨 암호화",
            items: ["OS 커널 레벨에서의 빠른 암복호화", "도입 시 성능 부하 1% 미만"],
          },
          {
            heading: "보안성 및 감사",
            items: [
              "안전한 암호모듈 (국정원 검증필 암호모듈)",
              "안전한 키 관리 (키 관리 전용 D.AMO KMS 연동)",
              "접근제어 (Process, User, IP, MAC, Time)",
              "물리적 보안 위협 대응 (도난·분실 시 해독 불가)",
              "감사 (사용자·시스템 감사)",
            ],
          },
          {
            heading: "암호화 데이터 백업 및 복원 기능 제공",
            items: ["데이터를 암호화된 상태로 백업 서버에 백업"],
          },
          {
            heading: "정형/비정형 데이터 파일·폴더 단위 암호화",
            items: ["이미지, 음성, 영상, 로그 등 모든 종류의 비정형 데이터 암호화 가능"],
          },
        ],
      },
      {
        title: "기술적 차별점 — 구축 및 사용자 편의성",
        blocks: [
          {
            items: ["Installer 방식으로 1일 이내 도입 가능", "Application 소스(쿼리) 수정 없음", "GUI 기반 관리도구 지원"],
          },
        ],
      },
    ],
  },
];

const defaultLineup = lineups[0];

function getLineup(slug: string): LineupDetail | undefined {
  return lineups.find((lineup) => lineup.slug === slug);
}

export function generateStaticParams() {
  return lineups.map((lineup) => ({ lineup: lineup.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lineup: string }>;
}): Promise<Metadata> {
  const { lineup: slug } = await params;
  const lineup = getLineup(slug) ?? defaultLineup;

  return {
    title: `${lineup.label} - 적용 환경별 D.AMO 라인업 | Penta Security`,
    description: lineup.description,
  };
}

export default async function DataSecurityLineupPage({
  params,
}: {
  params: Promise<{ lineup: string }>;
}) {
  const { lineup: slug } = await params;
  const activeLineup = getLineup(slug);

  if (!activeLineup) {
    redirect(`/products/data-security/${defaultLineup.slug}`);
  }

  const content = getSiteContent();

  return (
    <div className="bg-[#f2f2f2] text-(--color-text-primary)">
      <SiteHeader navigation={content.navigation} footer={content.footer} />

      <main className="bg-[#f2f2f2] pb-[100px]">
        <section className="bg-[#f2f2f2] pb-[50px] pt-[110px]">
          <div className="penta-container">
            <h1 className="text-balance text-[42px] font-black leading-[1.15] tracking-[-0.03em] text-(--color-text-primary) md:text-[60px]">
              적용 환경별 D.AMO 라인업
            </h1>
            <p className="mt-[18px] text-[18px] leading-[30px] text-(--color-text-sub)">
              고객의 시스템 아키텍처에 따라 onApplication · onDB · onOS 세 가지 방식으로 전 계층 데이터를
              암호화합니다.
            </p>
          </div>
        </section>

        <section className="bg-[#f2f2f2]">
          <div className="penta-container">
            <div className="flex flex-wrap justify-start gap-5" role="tablist" aria-label="D.AMO 라인업">
              {lineups.map((lineup) => {
                const isActive = lineup.slug === activeLineup.slug;

                return (
                  <TabLink
                    key={lineup.slug}
                    href={`/products/data-security/${lineup.slug}`}
                    active={isActive}
                  >
                    {lineup.label}
                  </TabLink>
                );
              })}
            </div>

            <div className="mt-7">
              <p className="mb-7 text-[24px] font-bold leading-[38px] text-(--color-text-primary) md:text-[26px]">
                {activeLineup.description}
              </p>

              <div className="flex flex-col gap-4">
                {activeLineup.cards.map((card) => (
                  <article key={card.title} className="rounded-xl border border-[#e5e8ed] bg-[#fafbfc] px-7 py-8 md:px-9">
                    <div className="mb-[18px] flex items-center gap-4">
                      <span className="h-6 w-1 shrink-0 rounded-sm bg-(--color-text-accent)" aria-hidden="true" />
                      <h2 className="text-[22px] font-bold text-(--color-text-primary)">{card.title}</h2>
                    </div>

                    <div className="space-y-4 pl-5 text-[15px] leading-[26px] text-(--color-text-sub)">
                      {card.blocks.map((block, index) => (
                        <section key={`${card.title}-${block.heading ?? index}`}>
                          {block.heading ? (
                            <h3 className="mb-1 font-semibold text-(--color-text-primary)">{block.heading}</h3>
                          ) : null}
                          <ul>
                            {block.items.map((item) => (
                              <li key={item}>· {item}</li>
                            ))}
                          </ul>
                        </section>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter footer={content.footer} navigation={content.navigation} />
    </div>
  );
}
