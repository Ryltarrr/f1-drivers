import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "src/utils/trpc";
import DriverVote from "src/components/DriverVote";

const Vote: NextPage = () => {
  const {
    data: drivers,
    refetch,
    isLoading,
  } = trpc.useQuery(["drivers.twoRandom"], {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
  const vote = trpc.useMutation(["drivers.vote"]);

  const handleVote = (driverId: string) => {
    const otherId = drivers?.find((el) => el?.id !== driverId)?.id;
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
    refetch();
  };

  const fetchingNext = vote.isLoading || isLoading;

  return (
    <>
      <Head>
        <title>Vote</title>
        <meta name="description" content="Vote for your favorite pilot" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="flex flex-col h-[85vh] justify-center">
        <div>
          <div className="flex flex-1 flex-col md:flex-row justify-center space-y-5 md:space-y-0 md:space-x-5">
            {fetchingNext ? (
              <p className="text-center dark:text-white">loading...</p>
            ) : (
              drivers?.map(
                (driver) =>
                  driver && (
                    <DriverVote
                      key={driver.id}
                      driver={driver}
                      handleVote={handleVote}
                    />
                  )
              )
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Vote;
