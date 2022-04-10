import { useEffect } from "react";
import { Tag } from "../types";

interface Props {
  getTags: () => Promise<void>;
  deleteTag: (id: number) => Promise<void>;
  tags: Tag[];
}

export const TagList: React.FC<Props> = ({
  getTags,
  deleteTag,
  tags,
}: Props) => {
  useEffect(() => {
    if (!tags.length) {
      getTags();
    }
  }, [tags]);

  return (
    <div>
      {tags
        ? tags.map((tag) => (
            <button key={tag.id} onClick={() => deleteTag(tag.id)}>
              {tag.name}
            </button>
          ))
        : null}
    </div>
  );
};
