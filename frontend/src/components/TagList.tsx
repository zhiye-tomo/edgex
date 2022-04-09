import { useEffect } from "react";
import { useAuthDispatch } from "context/auth";
import { Tag } from "../types";

interface Props {
  getTags: () => Promise<void>;
  handleClick: (id: number) => Promise<void>;
  tags: Tag[];
}

export const TagList: React.FC<Props> = ({
  getTags,
  handleClick,
  tags,
}: Props) => {
  const { jwt } = useAuthDispatch();

  useEffect(() => {
    if (!tags.length) {
      getTags();
    }
  }, [tags]);

  return (
    <div>
      {tags
        ? tags.map((tag) => (
            <button key={tag.id} onClick={() => handleClick(tag.id)}>
              {tag.name}
            </button>
          ))
        : null}
    </div>
  );
};
