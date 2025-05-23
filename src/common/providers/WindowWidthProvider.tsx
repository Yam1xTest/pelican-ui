import {
  PropsWithChildren,
  createContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type WindowWidth = {
  windowWidth: number;
  handleSetWindowWidth:() => void;
};

export const WindowWidthContext = createContext<WindowWidth>({
  windowWidth: 0,
  handleSetWindowWidth: () => {},
});

export function WindowWidthProvider({
  children,
}: PropsWithChildren) {
  const [windowWidth, setWindowWidth] = useState(0);

  const handleSetWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (windowWidth === 0) {
      handleSetWindowWidth();
    }

    window.addEventListener(`resize`, handleSetWindowWidth);

    return () => {
      window.removeEventListener(`resize`, handleSetWindowWidth);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  const windowWidthState = useMemo(() => ({
    windowWidth,
    handleSetWindowWidth,
  }), [windowWidth]);

  return (
    <WindowWidthContext.Provider value={windowWidthState}>
      {children}
    </WindowWidthContext.Provider>
  );
}
