import { useMemo } from "react";
import { useWorkspace } from "@/components/portal/useWorkspace";
import TableCard, { EmptyState } from "@/components/portal/TableCard";
import StatusChip, {
  documentStatusTone,
} from "@/components/portal/StatusChip";
import InternalOnlyBadge from "@/components/portal/InternalOnlyBadge";
import { useVisibilityFilter } from "@/components/portal/ViewModeContext";
import type {
  ClientDocument,
  DocumentCategory,
} from "@/types/clientWorkspace";

const categoryOrder: DocumentCategory[] = [
  "Legal",
  "HIPAA",
  "Licensing",
  "Insurance",
  "Staffing",
  "Operations",
  "Marketing",
];

export default function ClientDocumentsPage() {
  const ws = useWorkspace();
  const filter = useVisibilityFilter();
  const docs = filter(ws.documents);

  const groups = useMemo(() => {
    return categoryOrder
      .map((cat) => ({
        category: cat,
        docs: docs.filter((d) => d.category === cat),
      }))
      .filter((g) => g.docs.length > 0);
  }, [docs]);

  return (
    <div className="space-y-6">
      <div className="becs-card p-4">
        <div className="becs-section-title">Document Request Hub</div>
        <p className="text-sm text-slate-600 mt-1">
          Centralized intake for legal, compliance, licensing, insurance, and
          staffing documentation. File uploads are tracked here once a secure
          storage integration is wired in.
        </p>
      </div>

      {groups.length === 0 ? (
        <TableCard title="Documents">
          <EmptyState message="No documents to display." />
        </TableCard>
      ) : (
        groups.map((g) => (
          <TableCard
            key={g.category}
            title={g.category}
            subtitle={`${g.docs.length} item${g.docs.length === 1 ? "" : "s"}`}
          >
            <DocsTable rows={g.docs} />
          </TableCard>
        ))
      )}
    </div>
  );
}

function DocsTable({ rows }: { rows: ClientDocument[] }) {
  return (
    <table className="becs-table">
      <thead>
        <tr>
          <th>Document</th>
          <th>Requested From</th>
          <th>Status</th>
          <th>File / Link</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((d) => (
          <tr key={d.id}>
            <td>
              <div className="flex items-start gap-2">
                <div className="font-medium text-becs-navy">
                  {d.document_name}
                </div>
                {d.internal_only ? <InternalOnlyBadge /> : null}
              </div>
            </td>
            <td>{d.requested_from}</td>
            <td>
              <StatusChip
                label={d.status}
                tone={documentStatusTone(d.status)}
              />
            </td>
            <td>
              {d.file_url ? (
                <a
                  href={d.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-becs-navy hover:text-becs-purple text-sm"
                >
                  Open file
                </a>
              ) : (
                <span className="text-xs text-slate-400">
                  Upload pending
                </span>
              )}
            </td>
            <td className="text-slate-600 text-sm">{d.notes || "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
