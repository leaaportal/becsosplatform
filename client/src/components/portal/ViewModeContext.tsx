import {
  createContext,
  useCallback,
  useContext,
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

export function ViewModeProvider({
  children,
  initial = "client",
}: {
  children: ReactNode;
  initial?: Visibility;
}) {
  const [view, setView] = useState<Visibility>(initial);
  const toggle = useCallback(
    () => setView((prev) => (prev === "client" ? "admin" : "client")),
    [],
  );
  const value = useMemo(
    () => ({ view, setView, toggle, isAdmin: view === "admin" }),
    [view, toggle],
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
