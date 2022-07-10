import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "src/utils/trpc";

const Vote: NextPage = () => {
  const drivers = trpc.useQuery(["drivers.twoRandom"], {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const vote = trpc.useMutation(["drivers.vote"]);

  const handleVote = (driverId: string) => {
    const otherId = drivers.data?.find((el) => el?.id !== driverId)?.id;
    if (!otherId) {
      return;
    }
    const driversVote = {
      voted: {
        driverId,
      },
      other: {
        driverId: otherId,
      },
    };
    vote.mutate(driversVote);
    drivers.refetch();
  };

  return (
    <>
      <Head>
        <title>Vote</title>
        <meta name="description" content="Vote for your favorite pilot" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Vote</h1>
        {drivers.data?.map(
          (driver) =>
            driver && (
              <div key={driver.id}>
                <h2>{driver.name}</h2>
                <p>{driver.id}</p>
                <button onClick={() => handleVote(driver.id)}>Vote</button>
              </div>
            )
        )}
      </main>
    </>
  );
};

export default Vote;
