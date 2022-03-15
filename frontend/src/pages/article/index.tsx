import React, { useState } from "react";
import PostPreview from "../../components/PostPreview";
import { useAuthDispatch } from "../../context/auth";
import axios from "axios";

export default function PostForm() {
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();
  const { user, jwt } = useAuthDispatch();

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(title);
  };

  const handleChangeBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setBody(e.target.value);
    console.log(body);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(`Bearer ${jwt}`);

      axios.post(
        `${process.env.NEXT_PUBLIC_HOST}${process.env.NEXT_PUBLIC_API_VERSION}/articles`,
        {
          title: title,
          body: body,
          users: [user],
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>An awesome article, please </h1>
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            id="post-title"
            placeholder="Title"
            value={title}
            onChange={(e) => handleChangeTitle(e)}
          />
          <div>
            <div>
              <textarea
                name="md"
                id="md"
                placeholder="In markdown, please."
                value={body}
                onChange={(e) => handleChangeBody(e)}
              ></textarea>
            </div>
            <div>
              <PostPreview markdown={body} />
            </div>
          </div>
          <input type="submit" />
        </form>
      </div>
    </>
  );
}
