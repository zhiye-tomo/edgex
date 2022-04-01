import type { NextPage } from "next";
import styles from "../styles/layouts/top.module.scss";
import { useMediaQueryContext } from "components/Provider/MediaQueryProvider";
import { PCContent } from "layouts/pc";
import { MobileContent } from "layouts/mobile";
import { Meta } from "components/Meta";

const Home: NextPage = () => {
  const { isPcSite } = useMediaQueryContext();

  return (
    <div className={styles.container}>
      <Meta title="Edgex" description="Welcome to Edge!" />
      {isPcSite ? <PCContent /> : <MobileContent />}
    </div>
  );
};

export default Home;
