import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

const Drivers: NextPage = () => {
  const drivers = trpc.useQuery(["driver.all"]);
  return (
    <>
      <Head>
        <title>Drivers</title>
      </Head>
      <main>
        <h1>Drivers</h1>
        {drivers.data?.map((d) => (
          <>
            <p>{d.name}</p>
            <button className="text-blue-500">Vote</button>
          </>
        ))}
      </main>
    </>
  );
};

export default Drivers;
