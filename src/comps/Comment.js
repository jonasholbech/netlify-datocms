import React, { useState } from "react";
import StyledMarkdown from "./StyledMarkdown";
import SubComment from "./SubComment";
import Button from "muicss/lib/react/button";
import Form from "muicss/lib/react/form";
import Textarea from "muicss/lib/react/textarea";

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

      <details className="subcomments">
        <summary>
          <h3>Kommentarer ({data.comments.data.length})</h3>
        </summary>
        <ol>
          {data.comments.data.map((sc) => (
            <SubComment key={sc._id} sc={sc} username={username} />
          ))}
          <li>
            <Form onSubmit={submit}>
              <label>
                Smid et svar:
                <Textarea
                  value={subCommentText}
                  onChange={(e) => setSubCommentText(e.target.value)}
                />
              </label>

              <Button
                disabled={subCommentText.length < 2}
                size="small"
                variant="raised"
                color="primary"
              >
                Svar!
              </Button>
            </Form>
          </li>
        </ol>
      </details>
    </article>
  );
};
export default Comment;
