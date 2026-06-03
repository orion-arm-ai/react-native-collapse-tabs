import { useContext } from "react";
import { Context } from "../context";
import { ContextType } from "../types/types";

export function useTabsContext(): ContextType<string> {
  const c = useContext(Context);
  if (!c) throw new Error("useTabsContext must be used inside <CollapseTabs>");
  return c;
}
