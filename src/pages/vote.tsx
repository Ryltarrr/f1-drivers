import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "src/utils/trpc";
import DriverVote from "src/components/DriverVote";

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
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <h1>Vote</h1>
        <div>
          {drivers.isLoading ? (
            <p>loading...</p>
          ) : (
            <div className="flex justify-center space-x-10">
              {drivers.data?.map(
                (driver) =>
                  driver && (
                    <DriverVote driver={driver} handleVote={handleVote} />
                  )
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Vote;
