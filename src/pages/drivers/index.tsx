import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "src/utils/trpc";

const Drivers: NextPage = () => {
  const drivers = trpc.useQuery(["drivers.all"]);

  return (
    <>
      <Head>
        <title>Drivers</title>
      </Head>
      <main>
        <h1>Drivers</h1>
        {drivers.data?.map((d) => (
          <>
            <Link href={`/drivers/${d.name}`}>
              <a className="block">{d.name}</a>
            </Link>
          </>
        ))}
      </main>
    </>
  );
};

export default Drivers;
