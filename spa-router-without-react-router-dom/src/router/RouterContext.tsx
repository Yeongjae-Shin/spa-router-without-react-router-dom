import { createContext } from "react";

interface RouterContext {
  path: string;
}

const RouterContext = createContext<RouterContext>({ path: "" });

export default RouterContext;
