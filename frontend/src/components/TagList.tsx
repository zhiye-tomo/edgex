import axios from "axios";
import { useEffect, useState } from "react";
import { host } from "../constants";
import { useAuthDispatch } from "../context/auth";
import { Tag } from "../types";
import { config } from "utils/config";

const TagList: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const { jwt } = useAuthDispatch();

  const getTags = async () => {
    const res = await axios.get(`${host}/tags`, config(jwt ?? ""));
    setTags(res.data.tags);
  };

  useEffect(() => {
    if (!tags.length) {
      getTags();
    }
  }, [tags]);

  return <div>{tags ? tags.map((tag) => <div>{tag.name}</div>) : null}</div>;
};
export default TagList;
