import { useState } from "react";
import PostPreview from "../../components/PostPreview";
import { useAuthDispatch } from "../../context/auth";

export default function PostForm() {
  const [article, setArticle] = useState();
  const { user, authenticated, jwt, loading } = useAuthDispatch();

  const handleChange = (e: any) => {
    e.preventDefault();
    console.log("authenticated: ", authenticated);
    console.log("global: ", user, authenticated, jwt, loading);

    setArticle(e.target.value);
  };

  return (
    <>
      <h1>An awesome article, please </h1>
      <div>
        <form>
          <input type="text" id="post-title" placeholder="Title" />
          <div>
            <div>
              <textarea
                name="md"
                id="md"
                placeholder="In markdown, please."
                value={article}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <PostPreview markdown={article} />
            </div>
          </div>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}
