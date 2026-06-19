import { useMemo } from "react";
import { useWorkspace } from "@/components/portal/useWorkspace";
import TableCard, { EmptyState } from "@/components/portal/TableCard";
import StatusChip, {
  complianceStatusTone,
  riskTone,
} from "@/components/portal/StatusChip";
import type {
  ComplianceCategory,
  ComplianceItem,
} from "@/types/clientWorkspace";

const COMPLIANCE_DISCLAIMER =
  "BE Consulting Solutions provides business systems, operations workflows, documentation structure, and implementation support. BECS does not provide legal, medical, insurance, tax, or licensed healthcare compliance advice. All legal, HIPAA, licensing, and regulatory requirements should be reviewed by the appropriate licensed professional.";

const categoryOrder: ComplianceCategory[] = [
  "Legal",
  "HIPAA / Privacy",
  "Licensing",
  "Insurance",
  "Staffing",
  "Operations",
];

export default function ClientCompliancePage() {
  const ws = useWorkspace();

  const groups = useMemo(
    () =>
      categoryOrder
        .map((cat) => ({
          category: cat,
          items: ws.compliance.filter((c) => c.category === cat),
        }))
        .filter((g) => g.items.length > 0),
    [ws.compliance],
  );

  return (
    <div className="space-y-6">
      <div className="becs-card border-becs-lime border-l-4 p-5">
        <div className="becs-section-title text-becs-navy">
          Compliance Disclaimer
        </div>
        <p className="mt-2 text-sm text-slate-700 leading-relaxed">
          {COMPLIANCE_DISCLAIMER}
        </p>
      </div>

      {groups.length === 0 ? (
        <TableCard title="Compliance">
          <EmptyState message="No compliance items have been logged yet." />
        </TableCard>
      ) : (
        groups.map((g) => (
          <TableCard
            key={g.category}
            title={g.category}
            subtitle={`${g.items.length} item${g.items.length === 1 ? "" : "s"}`}
          >
            <ComplianceTable rows={g.items} />
          </TableCard>
        ))
      )}
    </div>
  );
}

function ComplianceTable({ rows }: { rows: ComplianceItem[] }) {
  return (
    <table className="becs-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Status</th>
          <th>Responsible Party</th>
          <th>Risk</th>
          <th>Due</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((c) => (
          <tr key={c.id}>
            <td className="font-medium text-becs-navy">{c.item_name}</td>
            <td>
              <StatusChip
                label={c.status}
                tone={complianceStatusTone(c.status)}
              />
            </td>
            <td>{c.responsible_party}</td>
            <td>
              <StatusChip label={c.risk_level} tone={riskTone(c.risk_level)} />
            </td>
            <td className="text-slate-600">{c.due_date ?? "—"}</td>
            <td className="text-slate-600 text-sm">{c.notes || "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
