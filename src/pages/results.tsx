import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "src/utils/trpc";

const Results: NextPage = () => {
  const results = trpc.useQuery(["drivers.results"]);

  return (
    <>
      <Head>
        <title>Results</title>
        <meta name="description" content="Votes results" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Results</h1>
        {results.data?.map(
          (result) =>
            results && (
              <div key={result.id}>
                <h2>{result.driver.name}</h2>
                <p>{`${((result.voted / result.presented) * 100).toFixed(
                  2
                )}%`}</p>
              </div>
            )
        )}
      </main>
    </>
  );
};

export default Results;
