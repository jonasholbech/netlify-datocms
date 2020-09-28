import React, { useState } from "react";
import StyledMarkdown from "./StyledMarkdown";
import SubComment from "./SubComment";
import Button from "muicss/lib/react/button";
const Comment = ({ data, username, onNewSubComment, onCommentDelete }) => {
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
    <article className="Comment">
      <header>
        <h2 className="author">{data.author}</h2>
        {data.author === username && (
          <Button
            variant="raised"
            color="danger"
            onClick={() => onCommentDelete(data._id)}
          >
            Delete
          </Button>
        )}
      </header>
      <StyledMarkdown content={data.comment} />

      <div className="subcomments">
        <h3>Kommentarer</h3>
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

              <Button size="small" variant="raised" color="primary">
                Svar!
              </Button>
            </form>
          </li>
        </ol>
      </div>
    </article>
  );
};
export default Comment;
