import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "src/utils/trpc";

const Team: NextPage = () => {
  const router = useRouter();
  const teamName = router.query.name as string;

  const team = trpc.useQuery(["teams.byName", teamName]);
  if (!team.data?.name) {
    return <div>Team not found</div>;
  }
  return (
    <>
      <Head>
        <title>{teamName}</title>
      </Head>
      <main>
        <h1>{teamName}</h1>
        <p>{team.data?.id}</p>
      </main>
    </>
  );
};

export default Team;
