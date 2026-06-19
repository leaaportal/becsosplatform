import { NavLink, Outlet, useParams } from "react-router-dom";
import { getWorkspaceBySlug } from "@/data/theBeginningHomeHealth";
import { ViewModeProvider, useViewMode } from "./ViewModeContext";
import ViewToggle from "./ViewToggle";
import StatusChip from "./StatusChip";
import type { ClientWorkspace } from "@/types/clientWorkspace";

interface OutletCtx {
  workspace: ClientWorkspace;
}

const sectionLinks = [
  { to: "", label: "Command Center", end: true },
  { to: "roadmap", label: "Roadmap" },
  { to: "tasks", label: "Tasks" },
  { to: "documents", label: "Documents" },
  { to: "compliance", label: "Compliance" },
  { to: "deliverables", label: "Deliverables" },
  { to: "approvals", label: "Approvals" },
  { to: "meetings", label: "Meetings" },
  { to: "admin", label: "Admin", adminOnly: true },
];

function ClientWorkspaceShell({ workspace }: { workspace: ClientWorkspace }) {
  const { client, project } = workspace;
  const { isAdmin } = useViewMode();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <header className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500 font-semibold">
              BECS OS · Client Workspace
            </div>
            <h1 className="mt-1 text-3xl font-semibold text-becs-navy leading-tight">
              {client.company_name}
            </h1>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              {client.industry} · {client.service_type}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatusChip label={`Phase: ${client.current_phase}`} tone="accent" />
              <StatusChip label={client.status} tone="info" />
              <StatusChip label={`Contract: ${project.contract_status}`} tone="warn" />
              <StatusChip label={`Payment: ${project.payment_status}`} tone="warn" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ViewToggle />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        <aside className="lg:sticky lg:top-6 self-start">
          <nav className="becs-card p-2">
            <ul className="flex flex-row overflow-x-auto lg:flex-col lg:overflow-visible gap-1">
              {sectionLinks
                .filter((link) => isAdmin || !link.adminOnly)
                .map((link) => (
                  <li key={link.to || "index"} className="flex-none lg:w-full">
                    <NavLink
                      to={link.to}
                      end={link.end}
                      className={({ isActive }) =>
                        [
                          "block px-3 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors",
                          isActive
                            ? "bg-becs-navy text-white shadow"
                            : "text-slate-700 hover:bg-becs-cream hover:text-becs-navy",
                          link.adminOnly ? "ring-1 ring-becs-lime/40" : "",
                        ].join(" ")
                      }
                    >
                      {link.label}
                      {link.adminOnly ? (
                        <span className="ml-2 text-[10px] uppercase tracking-wider text-becs-lime">
                          internal
                        </span>
                      ) : null}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </nav>

          <div className="becs-card mt-4 p-4 text-xs text-slate-600 space-y-2">
            <div className="becs-section-title">Workspace</div>
            <div>
              <span className="text-slate-500">Engagement:</span>{" "}
              <span className="font-medium text-becs-navy">{client.status}</span>
            </div>
            <div>
              <span className="text-slate-500">Package:</span>{" "}
              <span className="font-medium text-becs-navy">{project.package_name}</span>
            </div>
            <div>
              <span className="text-slate-500">Primary Contact:</span>
              <div className="font-medium text-becs-navy break-words">
                {client.primary_contact_name}
              </div>
            </div>
            <div>
              <span className="text-slate-500">Created:</span>{" "}
              <span className="font-medium text-becs-navy">{client.created_at}</span>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <Outlet context={{ workspace } satisfies OutletCtx} />
        </section>
      </div>
    </div>
  );
}

export default function ClientWorkspaceLayout() {
  const { slug } = useParams<{ slug: string }>();
  const workspace = slug ? getWorkspaceBySlug(slug) : undefined;

  if (!workspace) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="becs-card p-8">
          <div className="becs-section-title">Client Workspace</div>
          <h2 className="mt-2 text-2xl font-semibold text-becs-navy">
            Workspace not found
          </h2>
          <p className="mt-2 text-slate-600">
            No client workspace is registered for the slug{" "}
            <code className="text-becs-purple">{slug}</code>.
          </p>
          <NavLink
            to="/portal/clients"
            className="mt-6 inline-flex items-center rounded-md bg-becs-navy text-white px-4 py-2 text-sm hover:bg-becs-purple"
          >
            Back to clients
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <ViewModeProvider initial="client">
      <ClientWorkspaceShell workspace={workspace} />
    </ViewModeProvider>
  );
}

export type { OutletCtx };
