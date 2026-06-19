import { useMemo, useState } from "react";
import { useWorkspace } from "@/components/portal/useWorkspace";
import TableCard, { EmptyState } from "@/components/portal/TableCard";
import StatusChip, {
  priorityTone,
  taskStatusTone,
} from "@/components/portal/StatusChip";
import InternalOnlyBadge from "@/components/portal/InternalOnlyBadge";
import {
  useViewMode,
  useVisibilityFilter,
} from "@/components/portal/ViewModeContext";
import type { ClientTask, OwnerType } from "@/types/clientWorkspace";

const ownerLabels: Record<OwnerType, string> = {
  BECS: "BECS-Owned",
  Client: "Client-Owned",
};

export default function ClientTasksPage() {
  const ws = useWorkspace();
  const filter = useVisibilityFilter();
  const { isAdmin } = useViewMode();

  const tasks = filter(ws.tasks);
  const [ownerFilter, setOwnerFilter] = useState<OwnerType | "All">("All");

  const filteredTasks = useMemo(() => {
    if (ownerFilter === "All") return tasks;
    return tasks.filter((t) => t.owner_type === ownerFilter);
  }, [tasks, ownerFilter]);

  const becsTasks = filteredTasks.filter((t) => t.owner_type === "BECS");
  const clientTasks = filteredTasks.filter((t) => t.owner_type === "Client");

  return (
    <div className="space-y-6">
      <div className="becs-card p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="becs-section-title">Task Board</div>
          <p className="text-sm text-slate-600">
            Track BECS and client responsibilities for this engagement. Visibility
            respects the {isAdmin ? "BECS Admin" : "Client"} view.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(["All", "BECS", "Client"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setOwnerFilter(opt)}
              className={[
                "text-xs px-3 py-1.5 rounded-md border transition-colors",
                ownerFilter === opt
                  ? "bg-becs-navy text-white border-becs-navy"
                  : "bg-white text-slate-600 border-slate-200 hover:border-becs-navy",
              ].join(" ")}
            >
              {opt === "All" ? "All Tasks" : ownerLabels[opt]}
            </button>
          ))}
        </div>
      </div>

      {ownerFilter !== "Client" ? (
        <TableCard
          title="BECS-Owned Tasks"
          subtitle="Work owned by BE Consulting Solutions."
        >
          {becsTasks.length === 0 ? (
            <EmptyState message="No BECS tasks match the current filter." />
          ) : (
            <TaskTable rows={becsTasks} />
          )}
        </TableCard>
      ) : null}

      {ownerFilter !== "BECS" ? (
        <TableCard
          title="Client-Owned Tasks"
          subtitle="Work owned by the client."
        >
          {clientTasks.length === 0 ? (
            <EmptyState message="No client tasks match the current filter." />
          ) : (
            <TaskTable rows={clientTasks} />
          )}
        </TableCard>
      ) : null}
    </div>
  );
}

function TaskTable({ rows }: { rows: ClientTask[] }) {
  return (
    <table className="becs-table">
      <thead>
        <tr>
          <th>Task</th>
          <th>Owner</th>
          <th>Phase</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Due</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((t) => (
          <tr key={t.id}>
            <td>
              <div className="flex items-start gap-2">
                <div>
                  <div className="font-medium text-becs-navy">{t.title}</div>
                  {t.description ? (
                    <div className="text-xs text-slate-500 mt-0.5">
                      {t.description}
                    </div>
                  ) : null}
                </div>
                {t.internal_only ? <InternalOnlyBadge /> : null}
              </div>
            </td>
            <td>
              <div className="text-xs text-slate-600">{t.assigned_to}</div>
              <div className="text-[11px] text-slate-400">{t.owner_type}</div>
            </td>
            <td>
              <StatusChip label={t.phase} tone="info" />
            </td>
            <td>
              <StatusChip label={t.priority} tone={priorityTone(t.priority)} />
            </td>
            <td>
              <StatusChip label={t.status} tone={taskStatusTone(t.status)} />
            </td>
            <td className="text-slate-600">{t.due_date ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
