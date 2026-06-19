import { Link } from "react-router-dom";
import StatusChip, {
  priorityTone,
  taskStatusTone,
} from "./StatusChip";
import type { ClientTask } from "@/types/clientWorkspace";
import { daysUntil, dueLabel, dueTone } from "@/lib/dates";

interface CriticalPathPanelProps {
  tasks: ClientTask[];
  limit?: number;
}

function rank(task: ClientTask): number {
  const due = daysUntil(task.due_date);
  const dueScore = due === null ? 1000 : due < 0 ? -1000 + due : due;
  const priorityScore =
    task.priority === "High" ? 0 : task.priority === "Medium" ? 10 : 20;
  const statusScore =
    task.status === "In Progress"
      ? -2
      : task.status === "Waiting"
        ? -1
        : task.status === "Not Started"
          ? 0
          : 100;
  return dueScore + priorityScore + statusScore;
}

export default function CriticalPathPanel({
  tasks,
  limit = 6,
}: CriticalPathPanelProps) {
  const open = tasks.filter((t) => t.status !== "Complete");
  const ranked = [...open].sort((a, b) => rank(a) - rank(b)).slice(0, limit);

  return (
    <section className="becs-card overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
        <div>
          <div className="becs-section-title">Critical Path</div>
          <h3 className="text-base font-semibold text-becs-navy">
            Next actions across BECS + client
          </h3>
        </div>
        <Link
          to="tasks"
          className="text-xs font-medium text-becs-navy hover:text-becs-purple"
        >
          Open task board →
        </Link>
      </div>

      {ranked.length === 0 ? (
        <div className="px-5 py-8 text-center text-sm text-slate-500">
          Nothing pending — all visible tasks are complete.
        </div>
      ) : (
        <ul className="divide-y divide-slate-100">
          {ranked.map((t) => (
            <li
              key={t.id}
              className="px-5 py-3 flex flex-wrap items-center gap-3 justify-between"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-becs-navy truncate">
                    {t.title}
                  </span>
                  <span
                    className={[
                      "becs-chip",
                      t.owner_type === "BECS"
                        ? "bg-becs-navy/10 text-becs-navy border border-becs-navy/20"
                        : "bg-becs-lime/20 text-becs-navy border border-becs-lime/40",
                    ].join(" ")}
                  >
                    {t.owner_type}
                  </span>
                </div>
                <div className="mt-1 text-xs text-slate-500">
                  {t.assigned_to}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <StatusChip
                  label={t.priority}
                  tone={priorityTone(t.priority)}
                />
                <StatusChip
                  label={t.status}
                  tone={taskStatusTone(t.status)}
                />
                <StatusChip
                  label={dueLabel(t.due_date)}
                  tone={dueTone(t.due_date)}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
