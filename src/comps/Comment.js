import React, { useState } from "react";
import StyledMarkdown from "./StyledMarkdown";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import SubComment from "./SubComment";
import Button from "muicss/lib/react/button";
import Form from "muicss/lib/react/form";
import Textarea from "muicss/lib/react/textarea";

const Comment = ({
  data,
  username,
  onNewSubComment,
  onCommentDelete,
  onSubCommentDelete,
}) => {
  const [subCommentText, setSubCommentText] = useState("");
  const [beingDeleted, setBeingDeleted] = useState(false);
  const [newSubCommentSubmitted, setNewSubCommentSubmitted] = useState(false);
  function submit(e) {
    e.preventDefault();
    setNewSubCommentSubmitted(true);
    onNewSubComment(
      {
        commentId: data._id,
        comment: subCommentText,
      },
      () => {
        setNewSubCommentSubmitted(false);
        setSubCommentText("");
      }
    );
  }
  function deleteComment(id) {
    setBeingDeleted(true);
    onCommentDelete(id, () => {
      setBeingDeleted(false);
    });
  }

  return (
    <article className="Comment">
      <header>
        <h2 className="author">{data.author}</h2>
        {data.author === username && (
          <Button
            variant="raised"
            color="danger"
            onClick={() => deleteComment(data._id)}
          >
            {beingDeleted ? (
              <UseAnimations
                animation={loading2}
                className="useAnimations"
                size={30}
                strokeColor="white"
              />
            ) : (
              "Slet"
            )}
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
            <SubComment
              key={sc._id}
              sc={sc}
              onSubCommentDelete={onSubCommentDelete}
              username={username}
            />
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
                {newSubCommentSubmitted ? (
                  <UseAnimations
                    animation={loading2}
                    className="useAnimations"
                    size={30}
                    strokeColor="white"
                  />
                ) : (
                  "Svar"
                )}
              </Button>
            </Form>
          </li>
        </ol>
      </details>
    </article>
  );
};
export default Comment;
