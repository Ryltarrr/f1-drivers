import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "src/utils/trpc";

const Teams: NextPage = () => {
  const teams = trpc.useQuery(["teams.all"]);
  return (
    <>
      <Head>
        <title>Teams</title>
      </Head>
      <main>
        <h1>Teams</h1>
        {teams.data?.map((t) => (
          <Link key={t.id} href={`/teams/${t.name}`}>
            <a className="block">{t.name}</a>
          </Link>
        ))}
      </main>
    </>
  );
};

export default Teams;
