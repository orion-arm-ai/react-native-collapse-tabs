import React from "react";
import { ContextType, TabName } from "../types/types";

export type { ContextType, TabName, RefComponent } from "../types/types";

export const Context = React.createContext<ContextType<TabName> | undefined>(
  undefined
);
