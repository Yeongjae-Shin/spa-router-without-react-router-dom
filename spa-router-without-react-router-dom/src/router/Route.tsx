import React, {
  ComponentType,
  ReactElement,
  createElement,
  useContext,
} from "react";
import RouterContext from "./RouterContext";

interface RouteProps {
  path: string;
  component: ReactElement | ComponentType<any>;
}

const Route = ({ path, component: Component }: RouteProps) => {
  const router = useContext(RouterContext);

  if (!router) {
    throw new Error("You should use Route inside Router");
  }

  if (router.path !== path) {
    return null;
  }

  return typeof Component === "function" ? createElement(Component) : Component;
};

export default Route;
