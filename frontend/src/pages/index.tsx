import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/layouts/top.module.scss";
import { Navigation } from "components/baseComponent/Navigation";
import { SideFooter } from "components/baseComponent/SideFooter";
import { Footer } from "components/baseComponent/Footer";
import { MainSection } from "components/baseComponent/MainSection";
import { useMediaQueryContext } from "components/Provider/MediaQueryProvider";

const Home: NextPage = () => {
  const { isPcSite } = useMediaQueryContext();

  if (isPcSite) {
    return <div>PC</div>;
  } else {
    return (
      <div className={styles.container}>
        <Head>
          <title>Create Nest App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <MainSection />
        <Footer />
        <aside className={styles.navigation}>
          <Navigation />
          <SideFooter />
        </aside>
      </div>
    );
  }
};

export default Home;
