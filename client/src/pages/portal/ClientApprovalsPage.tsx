import { useWorkspace } from "@/components/portal/useWorkspace";
import TableCard, { EmptyState } from "@/components/portal/TableCard";
import StatusChip, {
  approvalStatusTone,
} from "@/components/portal/StatusChip";

export default function ClientApprovalsPage() {
  const ws = useWorkspace();

  return (
    <div className="space-y-6">
      <div className="becs-card p-4">
        <div className="becs-section-title">Approval Center</div>
        <p className="text-sm text-slate-600 mt-1">
          Track scope, deliverable, milestone, and document approvals. Each
          approval routes to the appropriate client signatory.
        </p>
      </div>

      <TableCard
        title="Pending + Recent Approvals"
        subtitle={`${ws.approvals.length} approval item${ws.approvals.length === 1 ? "" : "s"}`}
      >
        {ws.approvals.length === 0 ? (
          <EmptyState message="No approvals have been requested yet." />
        ) : (
          <table className="becs-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Type</th>
                <th>Status</th>
                <th>Client Comment</th>
                <th>Approved By</th>
                <th>Approved Date</th>
              </tr>
            </thead>
            <tbody>
              {ws.approvals.map((a) => (
                <tr key={a.id}>
                  <td className="font-medium text-becs-navy">
                    {a.related_label}
                  </td>
                  <td>
                    <StatusChip label={a.related_type} tone="info" />
                  </td>
                  <td>
                    <StatusChip
                      label={a.approval_status}
                      tone={approvalStatusTone(a.approval_status)}
                    />
                  </td>
                  <td className="text-sm text-slate-600">
                    {a.client_comment || "—"}
                  </td>
                  <td className="text-sm text-slate-600">
                    {a.approved_by ?? "—"}
                  </td>
                  <td className="text-sm text-slate-600">
                    {a.approved_at ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </TableCard>
    </div>
  );
}
