import { useWorkspace } from "@/components/portal/useWorkspace";
import StatusCard from "@/components/portal/StatusCard";
import StatusChip, {
  approvalStatusTone,
  priorityTone,
  taskStatusTone,
} from "@/components/portal/StatusChip";
import InternalOnlyBadge from "@/components/portal/InternalOnlyBadge";
import AdminScratchpad from "@/components/portal/AdminScratchpad";
import { useViewMode } from "@/components/portal/ViewModeContext";

export default function ClientAdminPage() {
  const ws = useWorkspace();
  const { setView, isAdmin } = useViewMode();

  const internalTasks = ws.tasks.filter((t) => t.internal_only);
  const allTasksOpen = ws.tasks.filter((t) => t.status !== "Complete").length;
  const highRiskCompliance = ws.compliance.filter(
    (c) => c.risk_level === "High",
  );
  const pendingApprovals = ws.approvals.filter(
    (a) => a.approval_status === "Pending",
  );

  return (
    <div className="space-y-6">
      <div className="becs-card border-l-4 border-becs-purple p-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="becs-section-title text-becs-purple">
            BECS Internal Admin Panel
          </div>
          <h3 className="text-lg font-semibold text-becs-navy">
            Internal-only view · not shown to clients
          </h3>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            This panel shows contract + payment posture, internal-only tasks,
            risk/blocker notes, and BECS next actions for this engagement.
          </p>
        </div>
        {!isAdmin ? (
          <button
            type="button"
            onClick={() => setView("admin")}
            className="text-sm rounded-md bg-becs-purple text-white px-3 py-2 hover:bg-becs-navy"
          >
            Switch to BECS Admin view
          </button>
        ) : (
          <InternalOnlyBadge />
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          label="Contract Status"
          value={ws.project.contract_status}
          tone="warn"
        />
        <StatusCard
          label="Payment Status"
          value={ws.project.payment_status}
          tone="warn"
        />
        <StatusCard label="Open Tasks (All)" value={allTasksOpen} />
        <StatusCard
          label="Pending Approvals"
          value={pendingApprovals.length}
          tone="muted"
        />
      </div>

      <section className="becs-card p-5">
        <div className="becs-section-title">Scope Summary</div>
        <p className="mt-2 text-sm text-slate-700">{ws.project.scope_summary}</p>

        <div className="mt-4 rounded-lg border border-becs-purple/30 bg-becs-purple/5 p-4 text-sm text-becs-purple">
          <div className="becs-section-title text-becs-purple">
            Internal Notes
          </div>
          <p className="mt-1 whitespace-pre-line">
            {ws.project.internal_notes || "No internal notes recorded."}
          </p>
        </div>
      </section>

      <section className="becs-card overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100">
          <div className="becs-section-title">Internal-Only Tasks</div>
          <h3 className="text-base font-semibold text-becs-navy">
            Hidden from client-facing views
          </h3>
        </div>
        {internalTasks.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-slate-500">
            No internal-only tasks recorded.
          </div>
        ) : (
          <table className="becs-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Owner</th>
                <th>Priority</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {internalTasks.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className="font-medium text-becs-navy">{t.title}</div>
                    {t.description ? (
                      <div className="text-xs text-slate-500 mt-0.5">
                        {t.description}
                      </div>
                    ) : null}
                  </td>
                  <td className="text-sm text-slate-600">{t.assigned_to}</td>
                  <td>
                    <StatusChip
                      label={t.priority}
                      tone={priorityTone(t.priority)}
                    />
                  </td>
                  <td>
                    <StatusChip
                      label={t.status}
                      tone={taskStatusTone(t.status)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <section className="becs-card p-5">
        <div className="becs-section-title">Risks + Blockers</div>
        <h3 className="text-base font-semibold text-becs-navy">
          High-risk compliance items
        </h3>
        {highRiskCompliance.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            No high-risk compliance items logged.
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {highRiskCompliance.map((c) => (
              <li
                key={c.id}
                className="rounded-md border border-red-100 bg-red-50/50 p-3"
              >
                <div className="font-medium text-becs-navy">{c.item_name}</div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {c.category} · Owner: {c.responsible_party} · Status: {c.status}
                </div>
                {c.notes ? (
                  <div className="text-xs text-slate-600 mt-1">{c.notes}</div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="becs-card p-5">
        <div className="becs-section-title">BECS Next Actions</div>
        <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-slate-700">
          <li>Finalize and counter-sign the service agreement.</li>
          <li>Issue deposit invoice and confirm payment terms.</li>
          <li>Schedule kickoff once deposit clears.</li>
          <li>Load remaining intake checklist items in the workspace.</li>
          <li>Capture pilot learnings to harden the productized buildout.</li>
        </ul>
      </section>

      <AdminScratchpad storageKey={`becs-os.scratchpad.${ws.client.slug}`} />

      <section className="becs-card p-5">
        <div className="becs-section-title">Pending Approvals</div>
        {pendingApprovals.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            No approvals are currently pending.
          </p>
        ) : (
          <ul className="mt-3 space-y-2 text-sm">
            {pendingApprovals.map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between rounded-md border border-slate-100 bg-slate-50 px-3 py-2"
              >
                <div>
                  <div className="font-medium text-becs-navy">
                    {a.related_label}
                  </div>
                  <div className="text-xs text-slate-500">{a.related_type}</div>
                </div>
                <StatusChip
                  label={a.approval_status}
                  tone={approvalStatusTone(a.approval_status)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
