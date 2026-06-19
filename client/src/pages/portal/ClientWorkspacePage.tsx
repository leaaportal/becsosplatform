import { Link } from "react-router-dom";
import { useWorkspace } from "@/components/portal/useWorkspace";
import StatusCard from "@/components/portal/StatusCard";
import PhaseProgress from "@/components/portal/PhaseProgress";
import StatusChip from "@/components/portal/StatusChip";
import {
  useVisibilityFilter,
  useViewMode,
} from "@/components/portal/ViewModeContext";

export default function ClientWorkspacePage() {
  const ws = useWorkspace();
  const filter = useVisibilityFilter();
  const { isAdmin } = useViewMode();

  const visibleTasks = filter(ws.tasks);
  const becsOpen = visibleTasks.filter(
    (t) => t.owner_type === "BECS" && t.status !== "Complete",
  ).length;
  const clientOpen = visibleTasks.filter(
    (t) => t.owner_type === "Client" && t.status !== "Complete",
  ).length;
  const docsNeeded = filter(ws.documents).filter(
    (d) => d.status === "Needed" || d.status === "Requested",
  ).length;
  const complianceToReview = ws.compliance.filter(
    (c) => c.status !== "Complete" && c.status !== "Reviewed",
  ).length;
  const deliverablesInReview = filter(ws.deliverables).filter(
    (d) => d.status === "Review" || d.status === "Draft",
  ).length;
  const pendingApprovals = ws.approvals.filter(
    (a) => a.approval_status === "Pending",
  ).length;

  const nextMilestone =
    ws.project.contract_status === "Pending Signature"
      ? "Execute Service Agreement"
      : ws.project.payment_status === "Deposit Required"
        ? "Collect Deposit"
        : "Kickoff Meeting";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard label="Current Phase" value={ws.client.current_phase} tone="accent" />
        <StatusCard
          label="Engagement Status"
          value={ws.client.status}
          hint={ws.project.status}
        />
        <StatusCard
          label="Contract"
          value={ws.project.contract_status}
          tone="warn"
        />
        <StatusCard
          label="Payment"
          value={ws.project.payment_status}
          tone="warn"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <PhaseProgress current={ws.client.current_phase} />
        </div>
        <div className="becs-card p-5">
          <div className="becs-section-title">Next Milestone</div>
          <h3 className="mt-1 text-lg font-semibold text-becs-navy">
            {nextMilestone}
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            {ws.project.scope_summary}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            <Mini
              label="Open BECS Tasks"
              value={becsOpen}
              to="tasks"
            />
            <Mini
              label="Open Client Tasks"
              value={clientOpen}
              to="tasks"
            />
            <Mini
              label="Docs Needed"
              value={docsNeeded}
              to="documents"
            />
            <Mini
              label="Compliance to Review"
              value={complianceToReview}
              to="compliance"
            />
            <Mini
              label="Deliverables in Review"
              value={deliverablesInReview}
              to="deliverables"
            />
            <Mini
              label="Approvals Pending"
              value={pendingApprovals}
              to="approvals"
            />
          </div>
        </div>
      </div>

      <section className="becs-card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="becs-section-title">Engagement Snapshot</div>
            <h3 className="text-lg font-semibold text-becs-navy">
              {ws.project.project_name}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <StatusChip label={ws.project.package_name} tone="info" />
            <StatusChip label={ws.project.status} tone="warn" />
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-700">
          {ws.project.scope_summary}
        </p>
        {isAdmin && ws.project.internal_notes ? (
          <div className="mt-4 rounded-lg border border-becs-purple/30 bg-becs-purple/5 p-4 text-sm text-becs-purple">
            <div className="becs-section-title text-becs-purple">
              Internal Note · BECS Only
            </div>
            <p className="mt-1">{ws.project.internal_notes}</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}

function Mini({
  label,
  value,
  to,
}: {
  label: string;
  value: number;
  to: string;
}) {
  return (
    <Link
      to={to}
      className="rounded-md border border-slate-100 bg-slate-50 px-3 py-2 hover:border-becs-navy hover:bg-becs-cream transition-colors"
    >
      <div className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="text-base font-semibold text-becs-navy">{value}</div>
    </Link>
  );
}
