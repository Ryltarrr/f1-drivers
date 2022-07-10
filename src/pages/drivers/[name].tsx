import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { trpc } from "src/utils/trpc";

const Driver: NextPage = () => {
  const router = useRouter();
  const driverName = router.query.name as string;

  const driver = trpc.useQuery(["drivers.byName", driverName]);
  if (!driver.data?.name) {
    return <div>Driver not found</div>;
  }
  return (
    <>
      <Head>
        <title>{driverName}</title>
      </Head>
      <main>
        <h1>{driverName}</h1>
        <p>{driver.data?.id}</p>
      </main>
    </>
  );
};

export default Driver;
