import { createContext } from "react";

interface RouterContext {
  path: string;
  push: (path: string) => void;
}

const RouterContext = createContext<RouterContext | undefined>(undefined);

export default RouterContext;
