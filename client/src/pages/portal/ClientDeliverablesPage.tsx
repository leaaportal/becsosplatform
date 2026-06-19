import { useMemo } from "react";
import { useWorkspace } from "@/components/portal/useWorkspace";
import TableCard, { EmptyState } from "@/components/portal/TableCard";
import StatusChip, {
  deliverableStatusTone,
} from "@/components/portal/StatusChip";
import InternalOnlyBadge from "@/components/portal/InternalOnlyBadge";
import { useVisibilityFilter } from "@/components/portal/ViewModeContext";
import type { Deliverable, Phase } from "@/types/clientWorkspace";

const phases: Phase[] = ["PLAN", "EVOLVE", "SUCCEED"];

export default function ClientDeliverablesPage() {
  const ws = useWorkspace();
  const filter = useVisibilityFilter();
  const deliverables = filter(ws.deliverables);

  const groups = useMemo(
    () =>
      phases.map((phase) => ({
        phase,
        items: deliverables.filter((d) => d.phase === phase),
      })),
    [deliverables],
  );

  return (
    <div className="space-y-6">
      <div className="becs-card p-4">
        <div className="becs-section-title">Deliverables Manager</div>
        <p className="text-sm text-slate-600 mt-1">
          Every deliverable is grouped by phase. Approval-required items will
          surface in the Approvals center once they reach Review.
        </p>
      </div>

      {groups.map((g) =>
        g.items.length === 0 ? (
          <TableCard
            key={g.phase}
            title={`${g.phase} Phase Deliverables`}
            subtitle="No deliverables yet."
          >
            <EmptyState message={`No ${g.phase} deliverables to display.`} />
          </TableCard>
        ) : (
          <TableCard
            key={g.phase}
            title={`${g.phase} Phase Deliverables`}
            subtitle={`${g.items.length} item${g.items.length === 1 ? "" : "s"}`}
          >
            <DeliverablesTable rows={g.items} />
          </TableCard>
        ),
      )}
    </div>
  );
}

function DeliverablesTable({ rows }: { rows: Deliverable[] }) {
  return (
    <table className="becs-table">
      <thead>
        <tr>
          <th>Deliverable</th>
          <th>Phase</th>
          <th>Status</th>
          <th>Approval</th>
          <th>File / Link</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((d) => (
          <tr key={d.id}>
            <td>
              <div className="flex items-start gap-2">
                <div className="font-medium text-becs-navy">
                  {d.deliverable_name}
                </div>
                {d.internal_only ? <InternalOnlyBadge /> : null}
              </div>
            </td>
            <td>
              <StatusChip label={d.phase} tone="info" />
            </td>
            <td>
              <StatusChip
                label={d.status}
                tone={deliverableStatusTone(d.status)}
              />
            </td>
            <td>
              {d.approval_required ? (
                <span className="text-xs text-slate-700">
                  Required
                  {d.approved_by ? (
                    <span className="block text-becs-navy mt-0.5">
                      Approved by {d.approved_by}
                      {d.approved_at ? ` · ${d.approved_at}` : ""}
                    </span>
                  ) : null}
                </span>
              ) : (
                <span className="text-xs text-slate-400">Not required</span>
              )}
            </td>
            <td>
              {d.file_url ? (
                <a
                  href={d.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-becs-navy hover:text-becs-purple text-sm"
                >
                  Open
                </a>
              ) : (
                <span className="text-xs text-slate-400">Pending</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
