import type { Phase } from "@/types/clientWorkspace";

interface PhaseProgressProps {
  current: Phase;
  className?: string;
}

const order: Phase[] = ["PLAN", "EVOLVE", "SUCCEED"];

const descriptions: Record<Phase, string> = {
  PLAN: "Discovery, compliance readiness, document collection, workflow mapping.",
  EVOLVE: "Buildout of SOPs, intake/onboarding workflows, and operational tooling.",
  SUCCEED: "KPI tracking, growth planning, quality assurance, ongoing optimization.",
};

export default function PhaseProgress({ current, className }: PhaseProgressProps) {
  const currentIdx = order.indexOf(current);

  return (
    <div className={["becs-card p-5", className ?? ""].join(" ")}>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="becs-section-title">PLAN → EVOLVE → SUCCEED</div>
          <h3 className="text-lg font-semibold text-becs-navy">Engagement Phase</h3>
        </div>
        <span className="becs-chip bg-becs-lime/20 text-becs-navy border border-becs-lime/40">
          Active: {current}
        </span>
      </div>

      <ol className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {order.map((phase, idx) => {
          const state =
            idx < currentIdx
              ? "complete"
              : idx === currentIdx
                ? "active"
                : "upcoming";
          const styles =
            state === "active"
              ? "border-becs-navy bg-becs-navy text-white"
              : state === "complete"
                ? "border-becs-lime bg-becs-lime/15 text-becs-navy"
                : "border-slate-200 bg-white text-slate-500";
          return (
            <li
              key={phase}
              className={["rounded-lg border p-4 transition-colors", styles].join(" ")}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Phase {idx + 1}
                </span>
                <span className="text-xs">
                  {state === "complete"
                    ? "Complete"
                    : state === "active"
                      ? "In Progress"
                      : "Upcoming"}
                </span>
              </div>
              <div className="mt-1 text-lg font-semibold">{phase}</div>
              <p
                className={[
                  "mt-1 text-xs",
                  state === "active" ? "text-becs-cream/80" : "opacity-80",
                ].join(" ")}
              >
                {descriptions[phase]}
              </p>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 h-2 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-full bg-becs-lime transition-all"
          style={{
            width: `${((currentIdx + 1) / order.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
