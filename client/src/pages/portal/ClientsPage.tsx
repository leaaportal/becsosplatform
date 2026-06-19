import { Link } from "react-router-dom";
import { allClientWorkspaces } from "@/data/theBeginningHomeHealth";
import StatusChip from "@/components/portal/StatusChip";

export default function ClientsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6">
        <div className="becs-section-title">BECS OS · Clients</div>
        <h1 className="mt-1 text-3xl font-semibold text-becs-navy">
          Client Workspaces
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Each client workspace is the operational delivery surface for that
          engagement — tasks, documents, compliance, deliverables, approvals,
          and meetings live here.
        </p>
      </header>

      <div className="becs-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="becs-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Industry</th>
                <th>Phase</th>
                <th>Status</th>
                <th>Contract</th>
                <th>Payment</th>
                <th className="text-right">Workspace</th>
              </tr>
            </thead>
            <tbody>
              {allClientWorkspaces.map((w) => (
                <tr key={w.client.id}>
                  <td>
                    <div className="font-semibold text-becs-navy">
                      {w.client.company_name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {w.client.service_type}
                    </div>
                  </td>
                  <td>{w.client.industry}</td>
                  <td>
                    <StatusChip label={w.client.current_phase} tone="accent" />
                  </td>
                  <td>
                    <StatusChip label={w.client.status} tone="info" />
                  </td>
                  <td>
                    <StatusChip label={w.project.contract_status} tone="warn" />
                  </td>
                  <td>
                    <StatusChip label={w.project.payment_status} tone="warn" />
                  </td>
                  <td className="text-right">
                    <Link
                      to={`/portal/clients/${w.client.slug}`}
                      className="inline-flex items-center text-sm font-medium text-becs-navy hover:text-becs-purple"
                    >
                      Open →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
