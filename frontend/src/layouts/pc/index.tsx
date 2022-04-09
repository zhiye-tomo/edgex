import { Footer } from "components/baseComponent/Footer";
import { MainSection } from "components/baseComponent/MainSection";
import { Navigation } from "components/baseComponent/Navigation";
import styles from "../../styles/layouts/top.module.scss";

import { useAuthDispatch } from "context/auth";

export const PCContent: React.FC = () => {
  const { jwt } = useAuthDispatch();
  return (
    <div className={styles.container}>
      <aside className={styles.navigation}>
        {console.log(jwt)}
        <Navigation />
        <Footer />
      </aside>
      <MainSection />
    </div>
  );
};
