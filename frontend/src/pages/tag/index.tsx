import { Footer } from "components/BaseComponent/Footer";
import { Navigation } from "components/BaseComponent/Navigation";
import { Meta } from "components/Meta";
import { NextPage } from "next";
import styles from "../../styles/layouts/tag.module.scss";
import { CreateTagForm } from "components/TagPage/CreateTagForm";
import { TagList } from "components/TagPage/TagList";
import axios from "axios";
import { host } from "../../constants";
import { config } from "utils/config";
import { useAuthDispatch } from "context/auth";
import { Tag } from "types";
import { useState } from "react";

const TagPage: NextPage = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const { jwt } = useAuthDispatch();

  const getTags = async () => {
    const res = await axios.get(`${host}/tags`, {
      ...config(jwt ?? ""),
      params: { page: 1, limit: 3 },
    });
    setTags(res.data.items);
    console.log("res", res.data.items);
  };

  const createTag: (name: string) => Promise<void> = async (name) => {
    await axios.post(`${host}/tags`, { name }, config(jwt ?? ""));
    getTags();
  };

  const deleteTag: (id: number) => Promise<void> = async (id) => {
    await axios.delete(`${host}/tags/${id}`, config(jwt ?? ""));
    getTags();
  };

  return (
    <div className={styles.container}>
      <Meta
        title="Tag management"
        description="You can create, delete, and search tags"
      />
      <aside className={styles.navigation}>
        <Navigation />
        <Footer />
      </aside>
      <main className={styles.main}>
        <CreateTagForm createTag={createTag} />
        <TagList getTags={getTags} tags={tags} deleteTag={deleteTag} />
      </main>
    </div>
  );
};

export default TagPage;
