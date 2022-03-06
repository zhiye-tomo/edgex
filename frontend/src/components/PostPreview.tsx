import React from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const PostPreview = (props: any) => {
  return (
    <div>
      <div>
        <ReactMarkdown plugins={[gfm]} unwrapDisallowed={false}>
          {props.markdown}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default PostPreview;
