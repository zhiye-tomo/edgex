import { createContext, useContext, useMemo } from "react";
import useMedia from "use-media";

type Props = {
  children: React.ReactNode;
};

type Context = {
  isPcSite: boolean;
};

const MediaQueryContext = createContext<Context>({
  isPcSite: true,
});

const mediaQueries = {
  pc: "(min-width: 700px)",
};

export const MediaQueryProvider: React.FC<Props> = ({ children }: Props) => {
  const isPcSite = useMedia(mediaQueries.pc);
  const value = useMemo(() => ({ isPcSite }), [isPcSite]);

  return (
    <MediaQueryContext.Provider value={value}>
      {children}
    </MediaQueryContext.Provider>
  );
};

export const useMediaQueryContext = (): Context =>
  useContext(MediaQueryContext);
