import React, { useState } from "react";
import StyledMarkdown from "./StyledMarkdown";
import SubComment from "./SubComment";

const Comment = ({ data, username, onNewSubComment }) => {
  const [subCommentText, setSubCommentText] = useState("");
  function submit(e) {
    e.preventDefault();
    onNewSubComment({
      commentId: data._id,
      comment: subCommentText,
    });
    setSubCommentText("");
  }
  return (
    <article>
      <h2 className="author">{data.author}</h2>

      <StyledMarkdown content={data.comment} />
      {data.author === username && <button>Delete</button>}
      <div className="subcomments">
        <ol>
          {data.comments.data.map((sc) => (
            <SubComment key={sc._id} sc={sc} username={username} />
          ))}
          <li>
            <form onSubmit={submit}>
              <label>
                Smid et svar:
                <textarea
                  value={subCommentText}
                  onChange={(e) => setSubCommentText(e.target.value)}
                />
              </label>
              <button>Svar!</button>
            </form>
          </li>
        </ol>
      </div>
    </article>
  );
};
export default Comment;
