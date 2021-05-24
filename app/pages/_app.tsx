import Page from "../components/PageLayout";
import { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.scss";
import useDarkMode from "../hooks/useDarkMode";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <Page>
      <Head>
        <title>Sharing Things</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🐝</text></svg>"
        />
      </Head>
      <button type="button" onClick={() => setDarkMode(!darkMode)}>
        🌙 Toggle Dark Mode
      </button>
      <Component {...pageProps} />
    </Page>
  );
};

export default MyApp;
