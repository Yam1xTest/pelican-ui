import { useEffect } from "react";

export function useScrollTop({
  depend = [],
}: {
  depend?: unknown[];
} = {}) {
  useEffect(() => {
    document.body.scroll({
      top: 0,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, depend);
}
