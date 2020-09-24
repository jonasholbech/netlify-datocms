import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import Comment from "./Comment";

const List = ({ lists, slug, username, onNewComment, onNewSubComment }) => {
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
      <form onSubmit={submit}>
        <label>
          Skriv en besked
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button>Gem</button>
      </form>
      {thisList.comments.data.map((comment) => {
        return (
          <Comment
            onNewSubComment={onNewSubCommentList}
            username={username}
            key={comment._id}
            data={comment}
          />
        );
      })}
    </main>
  );
};
export default List;