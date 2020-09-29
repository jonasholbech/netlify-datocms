import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "@reach/router";
import usePortal from "react-useportal";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import Button from "muicss/lib/react/button";
import Panel from "muicss/lib/react/panel";
import Form from "muicss/lib/react/form";
import Textarea from "muicss/lib/react/textarea";

import Comment from "./Comment";
import Instructions from "./Instructions";

import { store } from "../reducer/store.js";

const List = ({ slug }) => {
  const { globalState, dispatch } = useContext(store);
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const [comment, setComment] = useState("");
  const [newCommentSubmitted, setNewCommentSubmitted] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!globalState.username) {
      navigate(`/`);
    }
  }, [navigate, globalState.username]);

  const thisList = globalState.lists.find((list) => list.slug === slug);

  const submit = async (e) => {
    e.preventDefault();
    setNewCommentSubmitted(true);
    const payload = {
      comment,
      list: thisList._id,
      author: globalState.username,
    };
    const response = await fetch("/api/create-comment", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    dispatch({
      type: "addComment",
      payload: data.comment,
    });
    setNewCommentSubmitted(false);
    setComment("");
  };

  if (!thisList) {
    return <></>;
  }
  return (
    <main className="List">
      {isOpen && (
        <Portal>
          <div className="portal">
            <Instructions onClose={closePortal} />
          </div>
        </Portal>
      )}
      <h1>{thisList.title}</h1>
      {(slug !== "de-voksnes" || globalState.godMode) && (
        <Panel>
          <Form onSubmit={submit}>
            <label>
              Skriv en besked
              <Textarea
                className="listTextarea"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </label>
            <Button
              disabled={comment.length < 2}
              variant="raised"
              color="primary"
            >
              {newCommentSubmitted ? (
                <UseAnimations
                  animation={loading2}
                  className="useAnimations"
                  size={30}
                  strokeColor="white"
                />
              ) : (
                "Gem"
              )}
            </Button>
          </Form>
          <Button
            className="instructions"
            size="small"
            variant="fab"
            color="accent"
            onClick={openPortal}
          >
            ?
          </Button>
        </Panel>
      )}
      {thisList.comments.data.map((comment) => {
        return (
          <Panel key={comment._id}>
            <Comment data={comment} />
          </Panel>
        );
      })}
    </main>
  );
};
export default List;
