import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

const noise300 =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.25'/%3E%3C/svg%3E\")";

const glassStyle = {
  backdropFilter: "blur(30px)",
  WebkitBackdropFilter: "blur(30px)",
} satisfies CSSProperties;

export function HeroMainVisual() {
  return (
    <div className="relative h-[410px] w-full" aria-hidden="true">
      <div className="absolute left-[9%] top-[3%] h-[214px] w-[214px] rounded-full border-20 border-brand-blue bg-brand-yellow shadow-[34px_34px_56px_rgba(254,203,9,0.32)]" />
      <div className="absolute right-[9%] top-[8%] h-[184px] w-[184px] bg-brand-blue" />
      <div
        className="absolute bottom-[16%] left-[30%] h-[206px] w-[206px] border border-white/50 bg-white/30 shadow-[0_5px_30px_rgba(0,0,0,0.05)]"
        style={{
          ...glassStyle,
          clipPath: "polygon(0% 0%, 79% 0%, 100% 21%, 100% 100%, 0% 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: noise300 }} />
      </div>
      <div
        className="absolute bottom-[20%] right-[20%] h-[82px] w-[82px] bg-brand-cyan"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)", transform: "rotate(-45deg)" }}
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
    <div className="relative h-[232px] w-[172px]" aria-hidden="true">
      <div className="absolute left-[22px] top-0 h-[150px] w-[128px] rounded-t-[64px] border-27 border-b-0 border-[#222222]" />
      <div
        className="absolute left-0 top-[96px] h-[136px] w-[172px] rounded-[22px] border border-white/60 bg-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
        style={glassStyle}
      >
        <div className="absolute inset-0 rounded-[inherit] opacity-25" style={{ backgroundImage: noise300 }} />
        <div className="absolute left-[72px] top-[44px] h-[29px] w-[29px] rounded-full bg-[rgba(210,210,210,0.4)]" />
        <div className="absolute left-[79px] top-[61px] h-[32px] w-[14px] rounded-[20px] bg-[rgba(210,210,210,0.4)]" />
      </div>
    </div>
  );
}

function WapplesVisual() {
  return (
    <div className="relative h-[210px] w-[360px]" aria-hidden="true">
      <div className="absolute left-0 top-[24px] h-[104px] w-[170px] rounded-[6px] bg-[#222222]">
        <div className="absolute right-[6px] top-[6px] flex gap-1">
          <span className="h-[7px] w-[7px] rounded-full bg-[#d9d9d9]" />
          <span className="h-[7px] w-[7px] rounded-full bg-[#d9d9d9]" />
          <span className="h-[7px] w-[7px] rounded-full bg-[#d9d9d9]" />
        </div>
      </div>

      <div className="absolute right-0 top-0 h-[160px] w-[240px]">
        {[
          "left-[46px] top-0",
          "left-[148px] top-0",
          "left-0 top-[56px]",
          "left-[102px] top-[56px]",
          "left-[46px] top-[112px]",
          "left-[148px] top-[112px]",
        ].map((position) => (
          <div
            key={position}
            className={cn(
              "absolute h-[47px] w-[92px] rounded-[4px] border border-white/60 bg-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.1)]",
              position,
            )}
            style={glassStyle}
          >
            <div className="absolute inset-0 rounded-[inherit] opacity-20" style={{ backgroundImage: noise300 }} />
          </div>
        ))}
      </div>
    </div>
  );
}

function IsignVisual() {
  return (
    <div className="relative h-[230px] w-[360px]" aria-hidden="true">
      <div className="absolute left-0 top-[8px] h-[168px] w-[164px]">
        <div className="absolute left-[47px] top-0 h-[69px] w-[69px] rounded-full bg-[#222222]" />
        <div className="absolute left-0 top-[83px] h-[86px] w-[164px] rounded-[50%_50%_28px_28px/68%_68%_28px_28px] bg-[#222222]" />
      </div>

      <div className="absolute right-0 top-0 h-[184px] w-[184px]">
        {[
          "left-0 top-0 h-[15px] w-[68px]",
          "left-0 top-0 h-[68px] w-[15px]",
          "right-0 top-0 h-[15px] w-[68px]",
          "right-0 top-0 h-[68px] w-[15px]",
          "bottom-0 left-0 h-[15px] w-[68px]",
          "bottom-0 left-0 h-[68px] w-[15px]",
          "bottom-0 right-0 h-[15px] w-[68px]",
          "bottom-0 right-0 h-[68px] w-[15px]",
        ].map((shape) => (
          <div
            key={shape}
            className={cn(
              "absolute border border-white/60 bg-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.1)]",
              shape,
            )}
            style={glassStyle}
          />
        ))}
        <div
          className="absolute left-[64px] top-[64px] h-[55px] w-[55px] rounded-full border border-white/60 bg-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
          style={glassStyle}
        />
      </div>
    </div>
  );
}

function CloudbricVisual() {
  const cloudClipId = "cloudbric-clip";

  return (
    <div className="relative h-[212px] w-[366px]" aria-hidden="true">
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id={cloudClipId} clipPathUnits="userSpaceOnUse">
            <path d="M 0 160 Q 0 196 40 196 L 276 196 Q 316 196 316 155 Q 316 100 278 88 Q 298 60 282 38 Q 266 10 238 24 Q 218 -8 180 8 Q 158 -16 128 10 Q 100 -8 86 20 Q 50 4 42 46 Q 8 60 0 100 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="absolute left-0 top-[18px] h-[180px] w-[180px]">
        {[
          "left-0 top-0",
          "left-[120px] top-0",
          "left-[60px] top-[60px]",
          "left-0 top-[120px]",
          "left-[120px] top-[120px]",
        ].map((position) => (
          <div key={position} className={cn("absolute h-[60px] w-[60px] bg-[#222222]", position)} />
        ))}
      </div>

      <div className="absolute right-0 top-0 h-[196px] w-[316px] drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
        <div
          className="h-[196px] w-[316px] bg-white/20"
          style={{
            ...glassStyle,
            clipPath: `url(#${cloudClipId})`,
          }}
        >
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: noise300 }} />
        </div>
      </div>
    </div>
  );
}
