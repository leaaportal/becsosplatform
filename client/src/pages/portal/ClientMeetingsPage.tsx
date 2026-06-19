import { useWorkspace } from "@/components/portal/useWorkspace";
import { useViewMode } from "@/components/portal/ViewModeContext";
import StatusChip from "@/components/portal/StatusChip";
import InternalOnlyBadge from "@/components/portal/InternalOnlyBadge";

export default function ClientMeetingsPage() {
  const ws = useWorkspace();
  const { isAdmin } = useViewMode();

  const meetings = isAdmin
    ? ws.meetings
    : ws.meetings.filter((m) => m.client_visible);

  return (
    <div className="space-y-6">
      <div className="becs-card p-4">
        <div className="becs-section-title">Meeting Notes</div>
        <p className="text-sm text-slate-600 mt-1">
          Summary of meetings, decisions, and agreed next steps. Internal notes
          are visible only in the BECS Admin view.
        </p>
      </div>

      {meetings.length === 0 ? (
        <div className="becs-card p-8 text-center text-sm text-slate-500">
          No meetings have been logged yet.
        </div>
      ) : (
        meetings.map((m) => (
          <article key={m.id} className="becs-card p-5">
            <header className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="becs-section-title">
                  {m.meeting_date}
                </div>
                <h3 className="mt-1 text-lg font-semibold text-becs-navy">
                  {m.title}
                </h3>
              </div>
              <div className="flex gap-2">
                {!m.client_visible ? <InternalOnlyBadge /> : null}
                <StatusChip
                  label={m.client_visible ? "Client Visible" : "BECS Only"}
                  tone={m.client_visible ? "success" : "info"}
                />
              </div>
            </header>

            <p className="mt-3 text-sm text-slate-700 whitespace-pre-line">
              {m.summary}
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Block title="Decisions" items={m.decisions} />
              <Block title="Next Steps" items={m.next_steps} />
            </div>

            {isAdmin && m.internal_notes ? (
              <div className="mt-4 rounded-lg border border-becs-purple/30 bg-becs-purple/5 p-4 text-sm text-becs-purple">
                <div className="becs-section-title text-becs-purple">
                  Internal Notes · BECS Only
                </div>
                <p className="mt-1 whitespace-pre-line">{m.internal_notes}</p>
              </div>
            ) : null}
          </article>
        ))
      )}
    </div>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
      <div className="becs-section-title">{title}</div>
      {items.length === 0 ? (
        <div className="text-xs text-slate-400 mt-2">None recorded.</div>
      ) : (
        <ul className="mt-2 space-y-1 text-sm text-slate-700 list-disc pl-5">
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
