import { NextPage } from "next";
import { Meta } from "../../components/Meta";
import { Footer } from "components/baseComponent/Footer";
import { Navigation } from "components/baseComponent/Navigation";
import styles from "../../styles/layouts/tag.module.scss";
import { CreateTagForm } from "../../components/CreateTagForm";
import { TagList } from "../../components/TagList";

const Tag: NextPage = () => {
  return (
    <div className={styles.container}>
      <Meta
        title="Manage tags"
        description="You can create, delete, and search tags"
      />
      <aside className={styles.navigation}>
        <Navigation />
        <Footer />
      </aside>
      <main className={styles.main}>
        <CreateTagForm />
        <TagList />
      </main>
    </div>
  );
};

export default Tag;
