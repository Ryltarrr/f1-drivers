import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "src/utils/trpc";
import Image from "next/image";

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
              <div
                style={{ backgroundColor: result.driver.team.color }}
                key={result.id}
              >
                <h2>{result.driver.name}</h2>
                <p>{`${(result.percentage * 100).toFixed(2)}%`}</p>
                <p>{result.presented}</p>
                <Image
                  height="100px"
                  width="100px"
                  src={`/images/${result.driver.shortName}.png`}
                />
              </div>
            )
        )}
      </main>
    </>
  );
};

export default Results;
