import { useEffect } from "react";

export function useScrollTop({
  dependencies = [],
}: {
  dependencies?: unknown[];
} = {}) {
  useEffect(() => {
    document.body.scroll({
      top: 0,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
