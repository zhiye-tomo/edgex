import { NextPage } from "next";
import { Meta } from "../../components/Meta";
import { useState } from "react";
import { Footer } from "components/baseComponent/Footer";
import { Navigation } from "components/baseComponent/Navigation";
import styles from "../../styles/layouts/tag.module.scss";
import { CreateTagForm } from "../../components/CreateTagForm";
import { TagList } from "components/TagList";
import { useAuthDispatch } from "context/auth";
import { Tag } from "../../types";
import { host } from "../../constants";
import { config } from "utils/config";
import axios from "axios";

const TagPage: NextPage = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const { jwt } = useAuthDispatch();

  const getTags = async () => {
    const res = await axios.get(`${host}/tags`, config(jwt ?? ""));
    console.log(res.data.items);

    setTags(res.data.items);
  };

  const createTag = async (name: string) => {
    await axios.post(`${host}/tags`, { name: name }, config(jwt ?? ""));
    getTags();
  };

  const handleClick: (id: number) => Promise<void> = async (id) => {
    await axios.delete(`${host}/tags/${id}`, config(jwt ?? ""));
    getTags();
  };

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
        <CreateTagForm createTag={createTag} />
        <TagList getTags={getTags} tags={tags} handleClick={handleClick} />
      </main>
    </div>
  );
};

export default TagPage;
