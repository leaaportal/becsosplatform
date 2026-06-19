import { NavLink, Outlet } from "react-router-dom";
import BecsMark from "@/components/branding/BecsMark";

const nav = [
  { to: "/portal", label: "Overview", end: true },
  { to: "/portal/clients", label: "Clients" },
];

export default function PortalShell() {
  return (
    <div className="min-h-screen flex flex-col bg-becs-cream">
      <header className="bg-becs-navy text-white border-b border-becs-purple/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <NavLink to="/portal" className="flex items-center gap-3 text-white hover:text-becs-cream">
            <BecsMark className="w-9 h-9" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">BECS OS</div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-becs-cream/70">
                BE Consulting Solutions
              </div>
            </div>
          </NavLink>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  [
                    "px-3 py-1.5 text-sm rounded-md transition-colors",
                    isActive
                      ? "bg-becs-lime/20 text-becs-cream"
                      : "text-becs-cream/80 hover:text-white hover:bg-white/5",
                  ].join(" ")
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden sm:flex items-center gap-2 text-xs text-becs-cream/70">
            <span className="inline-block w-2 h-2 rounded-full bg-becs-lime" />
            Operational
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-slate-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <div>
            BECS OS · Internal Workspace for BE Consulting Solutions and Pilot Clients
          </div>
          <div className="text-slate-400">
            PLAN · EVOLVE · SUCCEED
          </div>
        </div>
      </footer>
    </div>
  );
}
