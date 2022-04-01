import { NextPage } from "next";
import { Meta } from "../../components/Meta";
import styles from "../../styles/layouts/tag.module.scss";

const Tag: NextPage = () => {
  return (
    <div>
      <Meta
        title="Manage tags"
        description="You can create, delete, and search tags."
      />
      <>ねこ</>
    </div>
  );
};

export default Tag;
