import { useState, useEffect, useCallback } from "react";

interface History {
  push: (path: string) => void;
}

function useRouter(): History {
  const [_, setPath] = useState(window.location.pathname);

  /**
   * NOTE
   * @description pushState는 popstate 이벤트를 trigger하지 않기 때문에 직접 이벤트를 실행해준다.
   * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event#the_history_stack
   */
  const push = useCallback((path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
    setPath(path);
  }, []);

  useEffect(() => {
    const popstateListener = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", popstateListener);

    return () => {
      window.removeEventListener("popstate", popstateListener);
    };
  }, []);

  return { push };
}

export default useRouter;
