import { Footer } from "components/BaseComponent/Footer";
import { Navigation } from "components/BaseComponent/Navigation";
import { Meta } from "components/Meta";
import { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/layouts/tag.module.scss";
import { CreateTagForm } from "components/TagPage/CreateTagForm";
import { TagList } from "components/TagPage/TagList";
import axios from "axios";
import { host } from "../../constants";
import { config } from "utils/config";
import { useAuthDispatch } from "context/auth";
import { Tag } from "types";
import { useState, useRef, useEffect, useMemo } from "react";
import { Pagination } from "components/Pagination";

let PageSize = 2;

const TagPage: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tags, setTags] = useState<Tag[]>([]);
  const [lengthOfData, setLengthOfData] = useState<number>(0);
  const { jwt } = useAuthDispatch();
  const isFirstRender = useRef(true);
  const router = useRouter();

  const getTags = async (): Promise<void> => {
    const res = await axios.get(`${host}/tags`, {
      ...config(jwt ?? ""),
      params: { page: currentPage, limit: PageSize },
    });
    setTags(res.data.items);
    if (res.status !== 200) {
      router.push("/login");
    }
    setLengthOfData(res.data.meta.totalItems);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    getTags();
  }, [currentPage]);

  const createTag: (name: string) => Promise<void> = async (name) => {
    const res = await axios.post(`${host}/tags`, { name }, config(jwt ?? ""));
    if (res.status !== 201) {
      router.push("/login");
    }
    setTags((prev) => [...prev, res.data]);
  };

  const deleteTag: (id: number) => Promise<void> = async (id) => {
    const res = await axios.delete(`${host}/tags/${id}`, config(jwt ?? ""));
    if (res.status !== 204) {
      router.push("/login");
    }
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
        <Pagination
          siblingCount={1}
          currentPage={currentPage}
          totalCount={lengthOfData}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
};

export default TagPage;
