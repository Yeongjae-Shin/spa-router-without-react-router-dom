# 원티드 프리온보딩 1주차 과제

## React와 History API 사용하여 SPA Router 기능 구현하기

#### 조건1. 해당 주소로 진입했을 때 아래 주소에 맞는 페이지가 렌더링 되어야 한다.

- `/` → `root` 페이지
- `/about` → `about` 페이지

#### 조건2. 버튼을 클릭하면 해당 페이지로, 뒤로 가기 버튼을 눌렀을 때 이전 페이지로 이동해야 한다.

- 힌트) `window.onpopstate`, `window.location.pathname` History API`(pushState)`

#### 조건3. Router, Route 컴포넌트를 구현해야 하며, 형태는 아래와 같아야 한다.

```js
ReactDOM.createRoot(container).render(
  <Router>
    <Route path="/" component={<Root />} />
    <Route path="/about" component={<About />} />
  </Router>
);
```

#### 조건4. 최소한의 push 기능을 가진 useRouter Hook을 작성한다.

```js
const { push } = useRouter();
```

---

### 핵심 코드 설명

##### src/router/RouterContext.tsx

```js
import { createContext } from "react";

interface RouterContext {
  path: string;
}

const RouterContext = createContext < RouterContext > { path: "" };

export default RouterContext;
```

전역에서 `path`를 관리하기 위해 Context API를 사용했습니다. `Route.tsx`에서 전역에서 관리중인 `path`와 prop으로 받아온 `path`를 비교하여 일치하지 않으면 `null`을 return 하도록 처리했으며, 더 중요한 기능은 `Route` 컴포넌트가 반드시 `Router`의 child component로 사용되어야 하기 때문에 context가 존재하지 않을 경우 error를 return하도록 구현하였습니다.

##### src/router/Router.tsx

```js
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
```

다음은 `Router` 컴포넌트입니다. Context API의 Provider를 통해 현재 path에 접근할 수 있도록 구현하였고, state를 통해 현재 path를 관리합니다. window의 popstate 이벤트를 구독하다가 path가 변경될 때 state를 업데이트 해줍니다. RouterContext와 Router가 핵심 컴포넌트입니다.

##### src/router/Route.tsx

```js
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
```

RouterContext가 존재하지 않을 때(Route 컴포넌트를 Router 컴포넌트의 child로 사용하지 않았을 때) error를 return하여 반드시 Router의 children으로 사용하도록 구현하였고, Context에서 관리중인 path와 prop으로 받은 path가 일치하지 않을 때 null을 return하여 컴포넌트가 렌더링되지 않도록 구현하였습니다.

또한 `<Route path="/" component={<Main />} />`의 형태와 `<Route path="/" component={Main} />`의 형태 모두 사용가능하도록 구현하였습니다.

##### src/hooks/useRouter.tsx

```js
import { useState, useCallback } from "react";

interface History {
  path: string;
  push: (path: string) => void;
}

const useRouter: () => History = () => {
  const [path, setPath] = useState(window.location.pathname);

  const push = useCallback((newPath: string) => {
    window.history.pushState({}, "", newPath);
    window.dispatchEvent(new Event("popstate"));
    setPath(newPath);
  }, []);

  return { path, push };
};

export default useRouter;
```

`useRouter` 커스텀 훅의 핵심은 `window.dispatchEvent(new Event("popstate"))` 부분인데 이 코드를 추가한 이유는 `pushState` 이벤트는 클릭, 뒤로가기, 앞으로 가기 이벤트를 제외하면 `popstate`를 trigger하지 않기 때문에 `popstate` 이벤트를 구독하고 있는 Context의 path state를 업데이트 하기 위해 반드시 필요한 부분입니다.

> Note that just calling history.pushState() or history.replaceState() won't trigger a popstate event. The popstate event will be triggered by doing a browser action such as a click on the back or forward button (or calling history.back() or history.forward() in JavaScript).
>
> 💡 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event#the_history_stack)
