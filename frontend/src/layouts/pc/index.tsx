import { Footer } from "components/baseComponent/Footer";
import { MainSection } from "components/baseComponent/MainSection";
import { Navigation } from "components/baseComponent/Navigation";
import styles from "../../styles/layouts/top.module.scss";

export const PCContent: React.FC = () => {
  return (
    <div className={styles.container}>
      <aside className={styles.navigation}>
        <Navigation />
        <Footer />
      </aside>
      <MainSection />
    </div>
  );
};
