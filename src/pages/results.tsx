import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "src/utils/trpc";
import Image from "next/image";
import { getContrastingColor } from "src/utils/getConstrastingColor";

const Results: NextPage = () => {
  const results = trpc.useQuery(["drivers.results"]);

  return (
    <>
      <Head>
        <title>Results</title>
        <meta name="description" content="Votes results" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {results.data?.map(
          (result, index) =>
            results && (
              <div
                className="flex flex-col p-3 justify-center items-center rounded-md"
                style={{
                  backgroundColor: result.driver.team.color,
                  color: getContrastingColor(result.driver.team.color),
                }}
                key={result.id}
              >
                <h2>
                  P{index + 1} - {result.driver.name}
                </h2>
                <p>{`${(result.percentage * 100).toFixed(2)}%`}</p>
                <Image
                  height="100px"
                  width="100px"
                  alt={`${result.driver.name} profile image`}
                  src={`/images/${result.driver.shortName}.png`}
                />
              </div>
            )
        )}
      </div>
    </>
  );
};

export default Results;
