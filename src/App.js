import React, { useEffect, useContext } from "react";
import { Router } from "@reach/router";
import { store } from "./reducer/store.js";

import Nav from "./comps/Nav";
import Home from "./comps/Home";
import List from "./comps/List";
import "./App.css";

export default function App() {
  const { globalState, dispatch } = useContext(store);

  useEffect(() => {
    if (!globalState.loading) return;
    if (!globalState.username) return;
    const getLists = async () => {
      const response = await fetch("/api/get-all-lists");
      const data = await response.json();
      dispatch({
        type: "setLists",
        payload: data.lists,
      });
      dispatch({
        type: "loaded",
        payload: "",
      });
    };
    getLists();
  }, [globalState.loading, globalState.username, dispatch]);

  async function onSubCommentDelete(id, callback) {
    const promise = await fetch("/api/delete-subcomment", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    const data = await promise.json();
    const scId = data.comment._id;
    const coId = data.comment.parent._id;
    const liId = data.comment.parent.list._id;
    const nextLists = [...globalState.lists];
    const whichList = nextLists.findIndex((list) => list._id === liId);
    const whichComment = nextLists[whichList].comments.data.findIndex(
      (com) => com._id === coId
    );
    nextLists[whichList].comments.data[whichComment].comments.data = nextLists[
      whichList
    ].comments.data[whichComment].comments.data.filter(
      (com) => com._id !== scId
    );
    dispatch({
      type: "setLists",
      payload: nextLists,
    });

    callback();
  }

  return (
    <div className="App">
      <Nav />
      <Router>
        <Home path="/" />
        <List onSubCommentDelete={onSubCommentDelete} path="list/:slug" />
      </Router>
    </div>
  );
}
