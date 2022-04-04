import { tagCreationSchema } from "utils/validation/schema";
import { useFormik } from "formik";
import axios from "axios";
import { host } from "../constants";
import { useAuthDispatch } from "../context/auth";

type Tag = {
  tag: string;
};

export const CreateTagForm: React.FC = ({}) => {
  const { jwt } = useAuthDispatch();

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  const initialValues: Tag = {
    tag: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: tagCreationSchema,
    onSubmit: async () => {
      await axios.post(`${host}/tags`, { name: values.tag }, config);
    },
  });
  const { values, errors, touched, handleSubmit, handleChange } = formik;

  return (
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
      {errors.tag && touched.tag ? <p>{errors.tag}</p> : null}
      <button type="submit">Submit</button>
    </form>
  );
};
