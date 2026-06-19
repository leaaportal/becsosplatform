import { Link } from "react-router-dom";
import { allClientWorkspaces } from "@/data/theBeginningHomeHealth";
import StatusCard from "@/components/portal/StatusCard";

export default function PortalHomePage() {
  const totalClients = allClientWorkspaces.length;
  const totalOpenTasks = allClientWorkspaces.reduce(
    (acc, w) => acc + w.tasks.filter((t) => t.status !== "Complete").length,
    0,
  );
  const totalPendingApprovals = allClientWorkspaces.reduce(
    (acc, w) =>
      acc + w.approvals.filter((a) => a.approval_status === "Pending").length,
    0,
  );
  const totalDocsNeeded = allClientWorkspaces.reduce(
    (acc, w) =>
      acc +
      w.documents.filter(
        (d) => d.status === "Needed" || d.status === "Requested",
      ).length,
    0,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6">
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
          BECS OS
        </div>
        <h1 className="mt-1 text-3xl font-semibold text-becs-navy">
          Operational Portal
        </h1>
        <p className="mt-1 text-sm text-slate-600 max-w-2xl">
          Source of truth for BE Consulting Solutions delivery — projects,
          compliance readiness, deliverables, approvals, and client workspaces
          under the PLAN → EVOLVE → SUCCEED framework.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard label="Active Clients" value={totalClients} tone="accent" />
        <StatusCard
          label="Open Tasks"
          value={totalOpenTasks}
          hint="Across all client workspaces"
        />
        <StatusCard
          label="Pending Approvals"
          value={totalPendingApprovals}
          tone="warn"
        />
        <StatusCard
          label="Documents Outstanding"
          value={totalDocsNeeded}
          tone="muted"
        />
      </div>

      <section className="mt-8">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="becs-section-title">Client Workspaces</div>
            <h2 className="text-xl font-semibold text-becs-navy">
              Pilots + Active Engagements
            </h2>
          </div>
          <Link
            to="/portal/clients"
            className="text-sm text-becs-navy hover:text-becs-purple font-medium"
          >
            View all clients →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allClientWorkspaces.map((w) => (
            <Link
              key={w.client.id}
              to={`/portal/clients/${w.client.slug}`}
              className="becs-card p-5 hover:border-becs-navy hover:shadow-md transition-all block"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="becs-section-title">{w.client.industry}</div>
                  <div className="mt-1 text-lg font-semibold text-becs-navy">
                    {w.client.company_name}
                  </div>
                </div>
                <span className="becs-chip bg-becs-navy text-white border border-becs-navy">
                  {w.client.current_phase}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {w.project.scope_summary}
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <Stat label="Status" value={w.client.status} />
                <Stat label="Contract" value={w.project.contract_status} />
                <Stat label="Payment" value={w.project.payment_status} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1.5">
      <div className="text-[10px] uppercase tracking-wider text-slate-500">
        {label}
      </div>
      <div className="text-xs font-medium text-becs-navy">{value}</div>
    </div>
  );
}
