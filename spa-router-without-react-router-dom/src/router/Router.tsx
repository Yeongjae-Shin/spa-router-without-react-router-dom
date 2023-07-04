import React, { useState, useEffect, ReactNode } from "react";
import RouterContext from "./RouterContext";

interface RouterProps {
  children: ReactNode;
}

function Router({ children }: RouterProps) {
  const [path, setPath] = useState(window.location.pathname);

  const push = (path: string) => {
    window.history.pushState({}, "", path);
    setPath(path);
  };

  useEffect(() => {
    window.onpopstate = () => {
      setPath(window.location.pathname);
    };
  }, []);

  return (
    <RouterContext.Provider value={{ path, push }}>
      {children}
    </RouterContext.Provider>
  );
}

export default Router;
