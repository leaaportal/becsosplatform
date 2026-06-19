import type { ReactNode } from "react";

interface StatusCardProps {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  tone?: "default" | "accent" | "warn" | "success" | "muted";
  icon?: ReactNode;
}

const toneStyles: Record<NonNullable<StatusCardProps["tone"]>, string> = {
  default: "bg-white border-slate-200",
  accent: "bg-becs-navy text-white border-becs-purple",
  warn: "bg-amber-50 border-amber-200 text-amber-900",
  success: "bg-becs-lime/10 border-becs-lime/40 text-becs-navy",
  muted: "bg-slate-50 border-slate-200 text-slate-700",
};

const valueTone: Record<NonNullable<StatusCardProps["tone"]>, string> = {
  default: "text-becs-navy",
  accent: "text-white",
  warn: "text-amber-900",
  success: "text-becs-navy",
  muted: "text-slate-800",
};

export default function StatusCard({
  label,
  value,
  hint,
  tone = "default",
  icon,
}: StatusCardProps) {
  return (
    <div
      className={[
        "rounded-xl border p-4 shadow-card transition-colors",
        toneStyles[tone],
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="becs-section-title">{label}</div>
        {icon ? <div className="opacity-70">{icon}</div> : null}
      </div>
      <div className={["mt-2 text-2xl font-semibold leading-tight", valueTone[tone]].join(" ")}>
        {value}
      </div>
      {hint ? (
        <div
          className={[
            "mt-1 text-xs",
            tone === "accent" ? "text-becs-cream/80" : "text-slate-500",
          ].join(" ")}
        >
          {hint}
        </div>
      ) : null}
    </div>
  );
}
