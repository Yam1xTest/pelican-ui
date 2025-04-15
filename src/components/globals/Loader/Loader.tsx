import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function Loader() {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => (url !== route.asPath) && setIsLoading(true);
    const handleComplete = (url: string) => (url === route.asPath) && setIsLoading(false);

    route.events.on(`routeChangeStart`, handleStart);
    route.events.on(`routeChangeComplete`, handleComplete);
    route.events.on(`routeChangeError`, handleComplete);
    return () => {
      route.events.off(`routeChangeStart`, handleStart);
      route.events.off(`routeChangeComplete`, handleComplete);
      route.events.off(`routeChangeError`, handleComplete);
    };
  });
  return isLoading && (
    <div
      data-testid="loader"
      id="static-loader"
    >
      <div className="static-spinner" />
    </div>
  );
}
