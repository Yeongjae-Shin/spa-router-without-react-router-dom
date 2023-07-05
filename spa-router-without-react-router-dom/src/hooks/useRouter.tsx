import { useState, useCallback } from "react";

interface History {
  path: string;
  push: (path: string) => void;
}

const useRouter: () => History = () => {
  const [path, setPath] = useState(window.location.pathname);

  /**
   * NOTE
   * @description
   * pushState는 뒤로가기를 제외하면 popstate 이벤트를 trigger하지 않기 때문에 직접 이벤트를 실행해준다.
   * @link
   * https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event#the_history_stack
   */
  const push = useCallback((newPath: string) => {
    window.history.pushState({}, "", newPath);
    window.dispatchEvent(new Event("popstate"));
    setPath(newPath);
  }, []);

  return { path, push };
};

export default useRouter;
