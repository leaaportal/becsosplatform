import { useOutletContext } from "react-router-dom";
import type { OutletCtx } from "./ClientWorkspaceLayout";

export function useWorkspace() {
  return useOutletContext<OutletCtx>().workspace;
}
