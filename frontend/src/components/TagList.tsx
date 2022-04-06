import { useEffect } from "react";

import { Tag } from "../types";

interface Props {
  getTags: () => Promise<void>;
  tags: Tag[];
}

export const TagList: React.FC<Props> = ({ getTags, tags }: Props) => {
  useEffect(() => {
    if (!tags.length) {
      getTags();
    }
  }, [tags]);

  return <div>{tags ? tags.map((tag) => <div>{tag.name}</div>) : null}</div>;
};
