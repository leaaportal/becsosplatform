import { useViewMode } from "./ViewModeContext";

export default function ViewToggle() {
  const { view, setView } = useViewMode();
  const options: Array<{ id: "client" | "admin"; label: string }> = [
    { id: "client", label: "Client View" },
    { id: "admin", label: "BECS Admin" },
  ];
  return (
    <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 text-xs shadow-sm">
      {options.map((opt) => {
        const active = view === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setView(opt.id)}
            className={[
              "px-3 py-1.5 rounded-md font-medium transition-colors",
              active
                ? "bg-becs-navy text-white shadow"
                : "text-slate-600 hover:text-becs-navy",
            ].join(" ")}
            aria-pressed={active}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
