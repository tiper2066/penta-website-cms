import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { PrimaryCtaLink } from "@/components/ui/primary-cta-link";
import { getSiteContent } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "D.AMO - 국내 최초 암호 플랫폼 | Penta Security",
  description:
    "국내 최초 암호 플랫폼 D.AMO의 데이터 암호화, 키 관리, 컴플라이언스 지원 기능을 소개합니다.",
};

const benefits = [
  {
    number: "01",
    title: "모든 환경에 최적화된 암호화 제공",
    description:
      "Application, DB, OS 등 고객의 시스템 아키텍처에 따라 성능과 보안성을 최적화하여 적용할 수 있는 다양한 제품을 보유하고 있습니다.",
  },
  {
    number: "02",
    title: "국내외 컴플라이언스 100% 만족",
    description:
      "개인정보보호법, 전자금융감독규정, ISMS-P, GDPR, PCI-DSS 등 20년간 검증된 기술력으로 국내외 컴플라이언스를 만족하며 기업의 중요 정보를 안전하게 보호합니다.",
  },
  {
    number: "03",
    title: "강력한 키 관리 시스템 제공",
    description:
      "전용 Appliance 장비와 Cloud 시스템을 지원하며, 키 라이프사이클 관리, 감사, 접근제어 등 국내외 모든 암호화 솔루션과 연동 가능한 키 관리를 제공합니다.",
  },
  {
    number: "04",
    title: "국정원 검증 암호 모듈 및 양자내성 알고리즘 지원",
    description:
      "국가정보원 KCMVP 인증을 획득하고 국내외 표준(NIST, KPQC) 양자내성 암호 알고리즘을 탑재한 자체 개발 암호 모듈을 제공합니다.",
  },
];

const lineups = [
  {
    slug: "on-application",
    name: "D.AMO onApplication",
    description:
      "Application 서버에 설치한 API를 이용하여 암호화 수행 후 DBMS에 쿼리를 전송하는 방식으로 암/복호화 시 DBMS 부하를 최소화하며, 다양한 OS 및 DBMS를 지원하는 등 뛰어난 호환성을 지니고 있습니다.",
  },
  {
    slug: "on-db",
    name: "D.AMO onDB",
    description:
      "DB서버에 Package, Engine, DBMS API 등의 형태로 Agent를 설치하여 암/복호화를 수행하고, 접근 제어, 감사 기록, 권한 분리 등의 기능을 통해 통합 DB보안을 제공합니다.",
  },
  {
    slug: "on-os",
    name: "D.AMO onOS",
    description:
      "OS 커널 레벨에 Agent를 설치하여 정형/비정형 데이터의 암호화를 수행합니다. 파일 시스템 레벨에서 데이터를 보호하여 다양한 형태의 데이터 보안을 지원합니다.",
  },
];

const faqs = [
  {
    question: "D.AMO는 무엇인가요?",
    answer:
      "D.AMO는 데이터베이스에 저장된 중요한 정보에 대하여 접근 제어 및 암호화를 실행하는 데이터 보안 솔루션입니다. 기존 응용 프로그램을 수정하지 않고도 암호화를 적용할 수 있으며, 데이터베이스 사용자를 세분화하여 민감한 데이터를 보호합니다. 1차적으로 DB 사용자 단위의 로그인 권한을 클라이언트 IP별, 허용 시간대별, 접근 응용 프로그램별로 제어하고, 2차적으로 암호화 컬럼에 대한 암복호화 권한을 부여하여 데이터를 안전하게 보호합니다.",
  },
  {
    question: "암호화가 꼭 필요한가요? 접근 제어나 마스킹만으로는 부족한가요?",
    answer:
      "접근 제어, 마스킹, 토큰 등 다양한 조치가 있지만 암호화는 데이터에 대한 근본적인 보호를 제공하는 동시에, 원본을 복원할 수 있는 유일한 보호 기법입니다. 수학적 처리를 통해 알아볼 수 없게 변환된 데이터는 업무 처리에 활용될 때만 철저한 정책에 따라 원본을 복원할 수 있어 정보 보안 법규를 준수하는 동시에 안전한 데이터 활용을 가능하게 합니다.",
  },
  {
    question: "D.AMO 설치 후 기존 프로그램을 수정해야 하나요?",
    answer:
      "아니요, 수정할 필요가 없습니다. D.AMO를 설치하여 중요 데이터를 암호화하게 되더라도 기존 프로그램에서는 동일한 테이블 명과 컬럼 명으로 데이터베이스 접근이 가능하므로 아무런 변경 작업 없이 사용 가능합니다.",
  },
  {
    question: "암호화 적용 후 데이터 백업에 문제가 없나요?",
    answer:
      "네, 문제없습니다. 암호화된 데이터를 포함한 모든 오브젝트를 백업하고 복구할 경우 D.AMO가 설치된 환경에서 이전 상태 그대로 복원됩니다. 단, 별도 스크립트로 테이블 단위 백업 시에는 변경된 테이블 이름으로 백업해야 합니다.",
  },
  {
    question: "D.AMO는 어떤 보안 기능을 제공하나요?",
    answer:
      "D.AMO는 암호화, 접근 제어, 감사, 리포팅을 모두 제공하는 통합 DB 보안 솔루션입니다. 암호화: 중요 데이터를 안전하게 보호합니다. 접근 제어: 2단계로 진행됩니다. 1차는 로그인 시 IP 주소, 서비스명, 시간대에 따라 접근을 제어하고, 2차는 암호화된 컬럼 접근 시 IP 주소와 서비스명을 기준으로 필요한 경우에만 허용합니다. 감사: 정책 설정·변경·삭제는 물론 암호화 컬럼 접근 이력까지 상세히 기록합니다. 이를 통해 비정상적인 접근 시도를 감지하고 세션을 차단할 수 있습니다.",
  },
];

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[28px] font-bold leading-tight text-(--color-text-primary) md:text-[36px]">
      {children}
    </h2>
  );
}

export default function DataSecurityPage() {
  const content = getSiteContent();

  return (
    <div className="bg-[#f2f2f2] text-(--color-text-primary)">
      <SiteHeader navigation={content.navigation} footer={content.footer} />

      <main>
        <section className="bg-[#f2f2f2] pb-24 pt-16 md:pb-[200px] md:pt-[110px]">
          <div className="penta-container grid items-start gap-10 md:grid-cols-[1fr_240px]">
            <div>
              <h1 className="text-balance text-[38px] font-black leading-[1.15] tracking-[-0.03em] text-(--color-text-primary) md:text-[60px]">
                국내 최초 암호 플랫폼, D.AMO
              </h1>
              <p className="mt-5 text-[24px] font-bold leading-tight text-(--color-text-primary) md:text-[30px]">
                전 계층 데이터 암호화 솔루션
              </p>
              <p className="mt-5 max-w-[760px] whitespace-pre-line text-[16px] leading-[26px] text-(--color-text-sub) md:text-[18px] md:leading-[30px]">
                {"국내 최초 암호 플랫폼으로 20년 이상 공공조달 점유율 1위를 기록하며,\n국내 대기업, 금융, 공공기관 등 20,000여 개 레퍼런스로 그 기술성을 입증받았습니다."}
              </p>
              <div className="mt-[34px] flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <PrimaryCtaLink href="/support/contact" className="h-14 w-full px-[30px] text-[16px] sm:w-auto">
                  문의하기
                  <ArrowRight className="h-4 w-4" />
                </PrimaryCtaLink>
                <Button
                  asChild
                  variant="outline"
                  className="h-14 w-full border-[#cccfd4] bg-white px-[30px] text-[16px] hover:border-primary sm:w-auto"
                >
                  <Link href="/resources/downloads">
                    자료 다운로드
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <Image
              src="/assets/products/damo-visual.svg"
              alt="D.AMO 제품 이미지"
              width={240}
              height={290}
              className="hidden h-auto w-[240px] justify-self-end md:block"
              priority
            />
          </div>
        </section>

        <section className="bg-[#f2f2f2]">
          <div className="penta-container">
            <h2 className="text-balance text-[28px] font-bold leading-[1.42] text-(--color-text-primary) md:text-[34px]">
              연이어 터지는 대규모 데이터 유출 사고,
              <br className="hidden md:block" />
              이를 방지하기 위한 법적 규제 역시 강화되고 있습니다.
            </h2>
            <p className="mt-6 max-w-[1060px] whitespace-pre-line text-[16px] leading-[28px] text-(--color-text-sub) md:text-[18px] md:leading-8">
              {"데이터 유출은 단순 서비스 방해를 넘어 기업과 개인에게 영구적 손실을 입히는 심각한 위협입니다.\nD.AMO는 개인정보를 보호하고 기업의 신뢰와 브랜드 평판을 유지하는 동시에, 정부 및 규제기관의 법규 준수를 위한 모든 방안을 제시합니다."}
            </p>
          </div>
        </section>

        <section className="bg-[#f2f2f2] py-16 md:py-[100px]">
          <div className="penta-container">
            <SectionHeading>D.AMO를 선택하는 이유</SectionHeading>
            <div className="mt-8 grid gap-5 md:mt-11 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
              {benefits.map((benefit) => (
                <article
                  key={benefit.number}
                  className="min-h-0 rounded-[10px] border border-[#e5e8ed] bg-white p-6 md:min-h-[260px] md:px-7 md:py-8"
                >
                  <span className="text-[22px] font-bold text-(--color-text-accent)">{benefit.number}</span>
                  <h3 className="mt-3.5 text-[19px] font-semibold leading-[27px] text-(--color-text-primary)">
                    {benefit.title}
                  </h3>
                  <p className="mt-3.5 text-[15px] leading-6 text-(--color-text-sub)">{benefit.description}</p>
                </article>
              ))}
            </div>
            <div className="mt-8 flex min-h-[200px] items-center justify-center overflow-hidden rounded-[14px] bg-[#7c7c7c] p-8 text-[15px] text-[#d6d9de] md:mt-11 md:min-h-[440px] md:p-10">
              D.AMO 제품 이미지
            </div>
          </div>
        </section>

        <section className="bg-[#f2f2f2] pb-16 md:pb-[100px]">
          <div className="penta-container">
            <SectionHeading>적용 환경별 D.AMO 라인업</SectionHeading>
            <div className="mt-8 flex flex-col gap-4 md:mt-[43px]">
              {lineups.map((lineup) => (
                <Link
                  key={lineup.name}
                  href={`/products/data-security/${lineup.slug}`}
                  className="flex flex-col gap-4 rounded-xl border border-[#e5e8ed] bg-white px-5 py-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:flex-row md:items-center md:gap-8 md:px-9 md:py-7 md:hover:border-(--color-text-accent)"
                >
                  <h3 className="w-full rounded-[6px] bg-[#edf2ff] px-6 py-4 text-center text-[18px] font-semibold text-(--color-text-accent) md:min-w-[300px] md:text-[20px]">
                    {lineup.name}
                  </h3>
                  <p className="text-[16px] leading-[26px] text-(--color-text-sub)">{lineup.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f2f2f2]">
          <div className="penta-container">
            <div className="flex h-[200px] items-center justify-center rounded-[14px] bg-[#7c7c7c] text-[15px] text-[#d6d9de] md:h-[260px]">
              이미지 (수상 / 인증)
            </div>
          </div>
        </section>

        <section className="bg-[#f2f2f2] py-16 md:py-[100px]">
          <div className="penta-container">
            <SectionHeading>제품 구성</SectionHeading>
            <div className="mt-8 flex h-[200px] items-center justify-center rounded-[14px] bg-[#7c7c7c] text-[15px] text-[#d6d9de] md:mt-[43px] md:h-[260px]">
              제품 구성 / 사양표
            </div>
          </div>
        </section>

        <section className="bg-[#f2f2f2] py-16 md:py-[100px]">
          <div className="penta-container">
            <SectionHeading>FAQs</SectionHeading>
            <div className="mt-10 flex flex-col gap-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-xl border border-[#e5e8ed] bg-white px-5 py-6 md:px-9 md:py-[30px]">
                  <div className="flex items-start gap-3.5">
                    <span className="shrink-0 text-[20px] font-bold text-(--color-text-accent)">Q</span>
                    <h3 className="text-[17px] font-semibold leading-7 text-(--color-text-primary) md:text-[19px]">
                      {faq.question}
                    </h3>
                  </div>
                  <p className="mt-3.5 pl-0 text-[15px] leading-[26px] text-(--color-text-sub) md:pl-[30px] md:text-[16px] md:leading-[27px]">
                    {faq.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter footer={content.footer} navigation={content.navigation} />
    </div>
  );
}
