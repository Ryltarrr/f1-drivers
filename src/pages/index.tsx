import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1>Home</h1>
        <Link href="/teams">
          <a className="block">Teams</a>
        </Link>
        <Link href="/drivers">
          <a className="block">Drivers</a>
        </Link>
        <Link href="/vote">
          <a className="block">Vote</a>
        </Link>
        <Link href="/results">
          <a className="block">Results</a>
        </Link>
      </main>
    </>
  );
};

export default Home;
