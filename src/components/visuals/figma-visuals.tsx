import type { CSSProperties } from "react";

import cloudMask from "../../../ref-image/products-visual/mask-cloud.png";
import { cn } from "@/lib/utils";

const noise300 =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")";

const glassStyle = {
  backdropFilter: "blur(30px)",
  WebkitBackdropFilter: "blur(30px)",
} satisfies CSSProperties;

export function HeroMainVisual() {
  return (
    <div className="relative h-full min-h-[520px] w-full lg:min-h-[720px]" aria-hidden="true">
      <div className="absolute left-[21%] top-[218px] h-[214px] w-[214px] rounded-full bg-brand-yellow opacity-80 shadow-[24px_24px_42px_rgba(254,203,9,0.24)] sm:left-[27%] lg:left-[320px] lg:top-[96px] lg:h-[396px] lg:w-[396px] lg:opacity-100 lg:shadow-[34px_34px_56px_rgba(254,203,9,0.28)]" />
      <div className="absolute left-[76%] top-[274px] h-[136px] w-[136px] bg-brand-blue opacity-80 sm:left-[72%] lg:left-auto lg:right-0 lg:top-[178px] lg:h-[253px] lg:w-[253px] lg:opacity-100" />
      <div
        className="absolute left-[36%] top-[252px] h-[210px] w-[210px] border border-white/50 bg-white/30 opacity-80 shadow-[28px_24px_44px_rgba(39,67,143,0.22),0_8px_28px_rgba(0,0,0,0.08)] sm:left-[42%] lg:left-[592px] lg:top-[154px] lg:h-[387px] lg:w-[387px] lg:opacity-100 lg:shadow-[42px_34px_62px_rgba(39,67,143,0.28),0_8px_34px_rgba(0,0,0,0.08)]"
        style={{
          ...glassStyle,
          clipPath: "polygon(0% 0%, 79% 0%, 100% 21%, 100% 100%, 0% 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: noise300 }} />
      </div>
      <div
        className="absolute left-[7%] top-[356px] h-[42px] w-[42px] bg-brand-cyan sm:left-[12%] lg:left-[118px] lg:top-[330px] lg:h-[82px] lg:w-[82px]"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", transform: "scaleX(-1) rotate(-45deg)" }}
      />
    </div>
  );
}

export function ProductVisual({ productId }: { productId: string }) {
  if (productId === "wapples") {
    return <WapplesVisual />;
  }

  if (productId === "isign") {
    return <IsignVisual />;
  }

  if (productId === "cloudbric") {
    return <CloudbricVisual />;
  }

  return <DamoVisual />;
}

function DamoVisual() {
  return (
    <div className="relative h-[324px] w-[240px]" aria-hidden="true">
      <div className="absolute left-[31px] top-0 h-[209px] w-[179px] rounded-t-[89px] border-38 border-b-0 border-[#222222]" />
      <div
        className="absolute left-0 top-[134px] h-[190px] w-[240px] rounded-[31px] border border-white/60 bg-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
        style={glassStyle}
      >
        <div className="absolute inset-0 rounded-[inherit] opacity-25" style={{ backgroundImage: noise300 }} />
        <div className="absolute left-[101px] top-[61px] h-[40px] w-[40px] rounded-full bg-[rgba(210,210,210,0.4)]" />
        <div className="absolute left-[110px] top-[85px] h-[45px] w-[20px] rounded-[28px] bg-[rgba(210,210,210,0.4)]" />
      </div>
    </div>
  );
}

function WapplesVisual() {
  return (
    <div className="relative h-[284px] w-[486px]" aria-hidden="true">
      <div className="absolute left-0 top-[34px] z-10 h-[216px] w-[324px]">
        {[
          "left-[62px] top-0",
          "left-[200px] top-0",
          "left-0 top-[76px]",
          "left-[138px] top-[76px]",
          "left-[62px] top-[151px]",
          "left-[200px] top-[151px]",
        ].map((position) => (
          <div
            key={position}
            className={cn(
              "absolute h-[64px] w-[124px] rounded-[5px] border border-white/60 bg-white/20 shadow-[0_14px_40px_rgba(0,0,0,0.1)]",
              position,
            )}
            style={glassStyle}
          >
            <div className="absolute inset-0 rounded-[inherit] opacity-20" style={{ backgroundImage: noise300 }} />
          </div>
        ))}
      </div>

      <div className="absolute right-0 top-[52px] z-0 h-[177px] w-[294px] rounded-[10px] bg-[#222222]">
        <div className="absolute right-[10px] top-[10px] flex gap-[6px]">
          <span className="h-[11px] w-[11px] rounded-full bg-[#d9d9d9]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#d9d9d9]" />
          <span className="h-[11px] w-[11px] rounded-full bg-[#d9d9d9]" />
        </div>
      </div>
    </div>
  );
}

function IsignVisual() {
  return (
    <div className="relative h-[266px] w-[308px]" aria-hidden="true">
      <div className="absolute right-0 top-0 z-0 h-[245px] w-[238px]">
        <div className="absolute left-[68px] top-0 h-[100px] w-[100px] rounded-full bg-[#222222]" />
        <div className="absolute left-0 top-[120px] h-[125px] w-[238px] rounded-[50%_50%_40px_40px/68%_68%_40px_40px] bg-[#222222]" />
      </div>

      <div className="absolute left-0 top-0 z-10 h-[266px] w-[266px]">
        {[
          "left-0 top-0 h-[22px] w-[98px]",
          "left-0 top-0 h-[98px] w-[22px]",
          "right-0 top-0 h-[22px] w-[98px]",
          "right-0 top-0 h-[98px] w-[22px]",
          "bottom-0 left-0 h-[22px] w-[98px]",
          "bottom-0 left-0 h-[98px] w-[22px]",
          "bottom-0 right-0 h-[22px] w-[98px]",
          "bottom-0 right-0 h-[98px] w-[22px]",
        ].map((shape) => (
          <div
            key={shape}
            className={cn(
              "absolute border border-white/60 bg-white/20 shadow-[0_14px_40px_rgba(0,0,0,0.1)]",
              shape,
            )}
            style={glassStyle}
          />
        ))}
        <div
          className="absolute left-[93px] top-[93px] h-[80px] w-[80px] rounded-full border border-white/60 bg-white/20 shadow-[0_14px_40px_rgba(0,0,0,0.1)]"
          style={glassStyle}
        />
      </div>
    </div>
  );
}

function CloudbricVisual() {
  const patternCells = [
    "left-0 top-0",
    "left-[120px] top-0",
    "left-[60px] top-[60px]",
    "left-0 top-[120px]",
    "left-[120px] top-[120px]",
  ];

  return (
    <div className="relative h-[218px] w-[352px]" aria-hidden="true">
      <div className="absolute right-0 top-0 z-0 h-[180px] w-[180px]">
        {patternCells.map((position) => (
          <div key={position} className={cn("absolute h-[60px] w-[60px] bg-[#222222]", position)} />
        ))}
      </div>

      <div className="absolute left-0 top-[22px] z-10 h-[196px] w-[316px] drop-shadow-[0_20px_28px_rgba(0,0,0,0.22)]">
        <div
          className="relative h-[196px] w-[316px] overflow-hidden border border-white/60 bg-white/55"
          style={{
            ...glassStyle,
            maskImage: `url(${cloudMask.src})`,
            maskRepeat: "no-repeat",
            maskSize: "100% 100%",
            WebkitMaskImage: `url(${cloudMask.src})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "100% 100%",
          }}
        >
          <div className="absolute left-[172px] top-[-22px] h-[180px] w-[180px] opacity-70 blur-xl">
            {patternCells.map((position) => (
              <div key={position} className={cn("absolute h-[60px] w-[60px] bg-[#222222]", position)} />
            ))}
          </div>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: noise300 }} />
        </div>
      </div>
    </div>
  );
}
