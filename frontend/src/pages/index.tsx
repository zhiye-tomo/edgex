import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/layouts/top.module.scss";
import { useMediaQueryContext } from "components/Provider/MediaQueryProvider";
import { PCContent } from "layouts/pc";
import { MobileContent } from "layouts/mobile";

const Home: NextPage = () => {
  const { isPcSite } = useMediaQueryContext();

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Nest App</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scacle=1.0"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isPcSite ? <PCContent /> : <MobileContent />}
    </div>
  );
};

export default Home;
