import React from "react";
import { Tag } from "types";
import { useEffect } from "react";

interface Props {
  getTags: () => Promise<void>;
  deleteTag: (id: number) => Promise<void>;
  tags: Tag[];
}
export const TagList: React.FC<Props> = ({
  tags,
  getTags,
  deleteTag,
}: Props) => {
  useEffect(() => {
    console.log("tags", tags);

    if (!tags.length) {
      getTags();
    }
  }, [tags]);

  return (
    <>
      {tags
        ? tags.map((tag) => (
            <button key={tag.id} onClick={() => deleteTag(tag.id)}>
              {tag.name}
            </button>
          ))
        : null}
    </>
  );
};
