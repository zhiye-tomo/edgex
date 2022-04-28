import * as Yup from "yup";

const noValueError = "入力必須です";

export const tagCreationSchema = Yup.object().shape({
  tag: Yup.string().required(noValueError),
});
