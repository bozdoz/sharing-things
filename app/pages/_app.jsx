import Page from "../components/PageLayout";
import Head from "next/head";
import Link from "next/link";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="nav">
        <Link href="/mongo">Home</Link>
        <Link href="/new">Add Pet</Link>
      </div>
      <Component {...pageProps} />
    </Page>
  );
}

export default MyApp;
