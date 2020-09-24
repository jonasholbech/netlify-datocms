import React from "react";
import StyledMarkdown from "./StyledMarkdown";
const Comment = ({ data }) => {
  console.log(data);
  return (
    <article>
      <h2>{data.author}</h2>

      <StyledMarkdown content={data.comment} />
      {data.author === localStorage.getItem("username") && (
        <button>Delete</button>
      )}
    </article>
  );
};
export default Comment;
