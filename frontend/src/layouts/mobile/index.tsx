import { Footer } from "components/baseComponent/Footer";
import { MainSection } from "components/baseComponent/MainSection";
import { Navigation } from "components/baseComponent/Navigation";
import styles from "../../styles/layouts/top.module.scss";

export const MobileContent: React.FC = () => {
  return (
    <div className={styles.container}>
      <MainSection />
      <Footer />
      <aside className={styles.navigation}>
        <Navigation />
      </aside>
    </div>
  );
};
