import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { AuthProvider } from "../context/auth";
import { MediaQueryProvider } from "components/Provider/MediaQueryProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MediaQueryProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </MediaQueryProvider>
  );
}

export default MyApp;
