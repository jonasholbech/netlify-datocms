import React, { useState, useContext } from "react";
import StyledMarkdown from "./StyledMarkdown";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import SubComment from "./SubComment";
import Button from "muicss/lib/react/button";
import Form from "muicss/lib/react/form";
import Textarea from "muicss/lib/react/textarea";
import { store } from "../reducer/store.js";

const Comment = ({ data, onNewSubComment, onSubCommentDelete }) => {
  const { globalState, dispatch } = useContext(store);
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
  async function onCommentDelete() {
    setBeingDeleted(true);
    const response = await fetch("/api/get-subcomments", {
      method: "POST",
      body: JSON.stringify({
        id: data._id,
      }),
    });
    const getSCData = await response.json();

    const batchDeleteResponse = await fetch("/api/delete-subcomments-for-id", {
      method: "POST",
      body: JSON.stringify({ ids: getSCData.subcomments }),
    });
    await batchDeleteResponse.json();

    const commentDeleteResponse = await fetch("/api/delete-comment", {
      method: "POST",
      body: JSON.stringify({ id: data._id }),
    });
    const commentResponse = await commentDeleteResponse.json();

    dispatch({
      type: "deleteComment",
      payload: data,
    });
    //since it's being removed from the dom, no need to change state, i think
    //setBeingDeleted(false);
  }

  return (
    <article className="Comment">
      <header>
        <h2 className="author">{data.author}</h2>
        {data.author === globalState.username && (
          <Button variant="raised" color="danger" onClick={onCommentDelete}>
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
