import { useWorkspace } from "@/components/portal/useWorkspace";
import PhaseProgress from "@/components/portal/PhaseProgress";
import StatusChip, {
  deliverableStatusTone,
} from "@/components/portal/StatusChip";
import { useVisibilityFilter } from "@/components/portal/ViewModeContext";
import type { Phase } from "@/types/clientWorkspace";

const phases: Phase[] = ["PLAN", "EVOLVE", "SUCCEED"];

export default function ClientRoadmapPage() {
  const ws = useWorkspace();
  const filter = useVisibilityFilter();
  const deliverables = filter(ws.deliverables);

  return (
    <div className="space-y-6">
      <PhaseProgress current={ws.client.current_phase} />

      {phases.map((phase) => {
        const phaseDeliverables = deliverables.filter((d) => d.phase === phase);
        const isActive = ws.client.current_phase === phase;
        return (
          <section key={phase} className="becs-card overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="becs-section-title">Phase</div>
                <h3 className="text-lg font-semibold text-becs-navy">
                  {phase}
                </h3>
              </div>
              <StatusChip
                label={
                  isActive
                    ? "Active Phase"
                    : phases.indexOf(phase) <
                        phases.indexOf(ws.client.current_phase)
                      ? "Complete"
                      : "Upcoming"
                }
                tone={
                  isActive
                    ? "accent"
                    : phases.indexOf(phase) <
                        phases.indexOf(ws.client.current_phase)
                      ? "success"
                      : "muted"
                }
              />
            </div>
            <table className="becs-table">
              <thead>
                <tr>
                  <th>Deliverable</th>
                  <th>Status</th>
                  <th>Approval Required</th>
                </tr>
              </thead>
              <tbody>
                {phaseDeliverables.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-slate-500">
                      No deliverables defined for this phase yet.
                    </td>
                  </tr>
                ) : (
                  phaseDeliverables.map((d) => (
                    <tr key={d.id}>
                      <td className="font-medium text-becs-navy">
                        {d.deliverable_name}
                      </td>
                      <td>
                        <StatusChip
                          label={d.status}
                          tone={deliverableStatusTone(d.status)}
                        />
                      </td>
                      <td>{d.approval_required ? "Yes" : "No"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        );
      })}
    </div>
  );
}
