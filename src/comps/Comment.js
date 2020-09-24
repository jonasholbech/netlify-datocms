import React from "react";
import StyledMarkdown from "./StyledMarkdown";
import SubComment from "./SubComment";

const Comment = ({ data, username }) => {
  return (
    <article>
      <h2 className="author">{data.author}</h2>

      <StyledMarkdown content={data.comment} />
      {data.author === username && <button>Delete</button>}
      <div className="subcomments">
        <ol>
          {data.comments.data.map((sc) => (
            <SubComment sc={sc} username={username} />
          ))}
        </ol>
      </div>
    </article>
  );
};
export default Comment;
