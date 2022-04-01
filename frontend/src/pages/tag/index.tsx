import { NextPage } from "next";
import { Meta } from "../../components/Meta";
import { Footer } from "components/baseComponent/Footer";
import { Navigation } from "components/baseComponent/Navigation";
import styles from "../../styles/layouts/tag.module.scss";
import { tagCreationSchema } from "utils/validation/schema";
import { useFormik } from "formik";
import axios from "axios";
import { host } from "../../constants";
import { useAuthDispatch } from "../../context/auth";

type Tag = {
  tag: string;
};

const Tag: NextPage = () => {
  const { jwt, user } = useAuthDispatch();
  const initialValues: Tag = {
    tag: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: tagCreationSchema,
    onSubmit: async () => {
      const res = await axios.post(`${host}/users`);
    },
  });

  const { values, errors, touched, handleSubmit, handleChange } = formik;

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
        <form onSubmit={handleSubmit}>
          <label htmlFor="tag">Tag</label>
          {console.log(values.tag)}
          <input
            id="tag"
            name="tag"
            type="text"
            onChange={handleChange}
            value={values.tag}
          />
          {errors.tag && touched.tag ? (
            <p className={styles.error}>{errors.tag}</p>
          ) : null}
          <button type="submit">Submit</button>
        </form>
      </main>
    </div>
  );
};

export default Tag;
