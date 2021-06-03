import PageLayout from "../components/PageLayout";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.scss";

/** disable all server-side rendering mismatches */
const SafeHydrate: React.FC = ({ children }) => {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
};

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <SafeHydrate>
      <PageLayout>
        <Head>
          <title>Sharing Things</title>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧇</text></svg>"
          />
        </Head>
        <Component {...pageProps} />
      </PageLayout>
    </SafeHydrate>
  );
};

export default MyApp;
