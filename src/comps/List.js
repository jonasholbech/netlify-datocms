import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import Button from "muicss/lib/react/button";
import Panel from "muicss/lib/react/panel";
import Comment from "./Comment";

const List = ({
  lists,
  slug,
  username,
  onNewComment,
  onNewSubComment,
  onCommentDelete,
}) => {
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
      <h1>{thisList.title}</h1>
      <Panel>
        <form onSubmit={submit}>
          <label>
            Skriv en besked
            <textarea
              className="listTextarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </label>
          <Button variant="raised" color="primary">
            Gem
          </Button>
        </form>
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
