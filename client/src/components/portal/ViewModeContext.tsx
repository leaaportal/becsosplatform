import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Visibility } from "@/types/clientWorkspace";

interface ViewModeContextValue {
  view: Visibility;
  setView: (v: Visibility) => void;
  toggle: () => void;
  isAdmin: boolean;
}

const ViewModeContext = createContext<ViewModeContextValue | null>(null);

const STORAGE_KEY = "becs-os.viewMode";

function readStoredView(initial: Visibility): Visibility {
  if (typeof window === "undefined") return initial;
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored === "client" || stored === "admin") return stored;
  } catch {
    // sessionStorage may be unavailable (private mode, disabled storage).
  }
  return initial;
}

export function ViewModeProvider({
  children,
  initial = "client",
}: {
  children: ReactNode;
  initial?: Visibility;
}) {
  const [view, setViewState] = useState<Visibility>(() => readStoredView(initial));

  const setView = useCallback((next: Visibility) => {
    setViewState(next);
  }, []);

  const toggle = useCallback(
    () => setViewState((prev) => (prev === "client" ? "admin" : "client")),
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, view);
    } catch {
      // ignore storage failures
    }
  }, [view]);

  const value = useMemo(
    () => ({ view, setView, toggle, isAdmin: view === "admin" }),
    [view, setView, toggle],
  );
  return (
    <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>
  );
}

export function useViewMode(): ViewModeContextValue {
  const ctx = useContext(ViewModeContext);
  if (!ctx) {
    throw new Error("useViewMode must be used within a ViewModeProvider");
  }
  return ctx;
}

export function useVisibilityFilter() {
  const { view } = useViewMode();
  return function filterFn<T extends { internal_only?: boolean }>(items: T[]): T[] {
    if (view === "admin") return items;
    return items.filter((i) => !i.internal_only);
  };
}
