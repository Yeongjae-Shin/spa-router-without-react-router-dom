import React, { useState, useEffect, ReactNode } from "react";
import RouterContext from "./RouterContext";

interface RouterProps {
  children: ReactNode;
}

const Router = ({ children }: RouterProps) => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    window.onpopstate = () => setPath(window.location.pathname);
  }, []);

  return (
    <RouterContext.Provider value={{ path }}>{children}</RouterContext.Provider>
  );
};

export default Router;
