import axios from "axios";
import { useEffect, useState } from "react";
import { host } from "../constants";
import { useAuthDispatch } from "../context/auth";

type Tag = {
  name: string;
  createdAt: string;
  updatedAt: string;
  id: string;
};

export const TagList: React.FC = () => {
  const [tags, setTags] = useState<Array<Tag>>([]);
  const { jwt } = useAuthDispatch();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };

  const getTags = async () => {
    const res = await axios.get(`${host}/tags`, config);
    setTags(res.data.tags.map((tag: string) => tag));
  };

  useEffect(() => {
    if (!tags.length) {
      getTags();
    }
  }, [tags]);

  return (
    <div>
      {tags.map((tag) => {
        return <div>{tag.name}</div>;
      })}
    </div>
  );
};
