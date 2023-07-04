import React, { ComponentType, ReactElement, useContext } from "react";
import RouterContext from "./RouterContext";

interface RouteProps {
  path: string;
  component: ReactElement | ComponentType;
}

function Route({ path, component: Component }: RouteProps) {
  const router = useContext(RouterContext);

  if (!router) {
    throw new Error("You should use Route inside Router");
  }

  if (router.path !== path) {
    return null;
  }

  return typeof Component === "function" ? <Component /> : Component;
}

export default Route;
