import { useEffect, useRef, useState } from "react";

interface AdminScratchpadProps {
  storageKey: string;
}

const SAVED_TIMEOUT = 1500;

export default function AdminScratchpad({ storageKey }: AdminScratchpadProps) {
  const [value, setValue] = useState<string>("");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const hydratedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored !== null) setValue(stored);
    } catch {
      // ignore
    } finally {
      hydratedRef.current = true;
    }
  }, [storageKey]);

  useEffect(() => {
    if (!hydratedRef.current) return;
    if (typeof window === "undefined") return;
    const timeout = window.setTimeout(() => {
      try {
        window.localStorage.setItem(storageKey, value);
        setSavedAt(Date.now());
      } catch {
        // ignore quota / privacy errors
      }
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [value, storageKey]);

  useEffect(() => {
    if (savedAt === null) return;
    const timeout = window.setTimeout(() => setSavedAt(null), SAVED_TIMEOUT);
    return () => window.clearTimeout(timeout);
  }, [savedAt]);

  return (
    <div className="becs-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="becs-section-title text-becs-purple">
            BECS Scratchpad
          </div>
          <h3 className="text-base font-semibold text-becs-navy">
            Internal observations for this pilot
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Saved locally in your browser only. Not synced. Not visible to the
            client. Replace with a backed store once persistence is online.
          </p>
        </div>
        <span
          className={[
            "text-xs transition-opacity",
            savedAt ? "opacity-100 text-becs-navy" : "opacity-0",
          ].join(" ")}
          aria-live="polite"
        >
          Saved
        </span>
      </div>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Capture pilot learnings, scope creep signals, reusable assets, friction notes…"
        className="mt-3 w-full min-h-[160px] rounded-lg border border-slate-200 bg-becs-cream/40 p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-becs-navy/30 focus:border-becs-navy/40"
      />
    </div>
  );
}
