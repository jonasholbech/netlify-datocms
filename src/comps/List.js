import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import usePortal from "react-useportal";
import Button from "muicss/lib/react/button";
import Panel from "muicss/lib/react/panel";
import Form from "muicss/lib/react/form";
import Textarea from "muicss/lib/react/textarea";

import Comment from "./Comment";
import Instructions from "./Instructions";

const List = ({
  lists,
  slug,
  username,
  onNewComment,
  onNewSubComment,
  onCommentDelete,
}) => {
  const { openPortal, closePortal, isOpen, Portal } = usePortal();
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate(`/`);
    }
  }, [navigate]);
  const thisList = lists.find((list) => list.slug === slug);

  const submit = (e) => {
    e.preventDefault();
    onNewComment({
      comment,
      list: thisList._id,
    });
    setComment("");
  };

  const onNewSubCommentList = (payload) => {
    payload.listId = thisList._id;
    onNewSubComment(payload);
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
            Gem
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
      {thisList.comments.data.map((comment) => {
        return (
          <Panel key={comment._id}>
            <Comment
              onCommentDelete={onCommentDelete}
              onNewSubComment={onNewSubCommentList}
              username={username}
              data={comment}
            />
          </Panel>
        );
      })}
    </main>
  );
};
export default List;
