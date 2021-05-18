import { useEffect } from "react";

export const useScrollTop = () => {
  useEffect(() => {
    document.body.focus();
    window.scrollTo(0, 0);
  }, []);
};
