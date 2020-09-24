import React, { useEffect } from "react";
import { useNavigate } from "@reach/router";
import Comment from "./Comment";

const List = ({ lists, slug }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate(`/`);
    }
  }, [navigate]);
  const thisList = lists.find((list) => list.slug === slug);

  if (!thisList) {
    return <></>;
  }
  return (
    <main className="List">
      <h1>{thisList.title}</h1>
      {thisList.comments.data.map((comment) => {
        return <Comment key={comment._id} data={comment} />;
      })}
    </main>
  );
};
export default List;
