import { useFormik } from "formik";
import { tagCreationSchema } from "utils/validation/schema";
interface Props {
  createTag: (name: string) => Promise<void>;
}

interface InitialValues {
  tag: string;
}

export const CreateTagForm: React.FC<Props> = ({ createTag }: Props) => {
  const initialValues: InitialValues = {
    tag: "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: tagCreationSchema,
    onSubmit: () => {
      createTag(values.tag.trim());
      handleReset(values.tag);
    },
  });
  const { values, errors, touched, handleSubmit, handleChange, handleReset } =
    formik;
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tag">Tag</label>
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
