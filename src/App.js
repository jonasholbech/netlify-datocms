import React, { useState, useEffect, useContext } from "react";
import { Router } from "@reach/router";
import { store } from "./reducer/store.js";

import Nav from "./comps/Nav";
import Home from "./comps/Home";
import List from "./comps/List";
import "./App.css";

//TODO: split up these functions into helper files
export default function App() {
  const { globalState, dispatch } = useContext(store);
  console.log(globalState);

  const onNewComment = async (payload, callback) => {
    payload.author = globalState.username;
    const response = await fetch("/api/create-comment", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    const nextLists = [...globalState.lists];
    const whichList = nextLists.findIndex((list) => list._id === payload.list);
    nextLists[whichList].comments.data = nextLists[
      whichList
    ].comments.data.concat(data.comment);
    dispatch({
      type: "setLists",
      payload: nextLists,
    });
    callback();
  };
  const onNewSubComment = async (payload, callback) => {
    const newPayload = {
      comment: payload.comment,
      author: globalState.username,
      parent: payload.commentId,
    };
    const response = await fetch("/api/create-subcomment", {
      method: "POST",
      body: JSON.stringify(newPayload),
    });
    const data = await response.json();

    const nextLists = [...globalState.lists];
    const whichList = nextLists.findIndex(
      (list) => list._id === payload.listId
    );
    const whichComment = nextLists[whichList].comments.data.findIndex(
      (comment) => comment._id === payload.commentId
    );
    nextLists[whichList].comments.data[whichComment].comments.data = nextLists[
      whichList
    ].comments.data[whichComment].comments.data.concat(data.comment);

    dispatch({
      type: "setLists",
      payload: nextLists,
    });
    callback();
  };

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
  async function onCommentDelete(id, callback) {
    const response = await fetch("/api/get-subcomments", {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
    });
    const data = await response.json();

    const batchDeleteResponse = await fetch("/api/delete-subcomments-for-id", {
      method: "POST",
      body: JSON.stringify({ ids: data.subcomments }),
    });
    await batchDeleteResponse.json();

    const commentDeleteResponse = await fetch("/api/delete-comment", {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    const commentResponse = await commentDeleteResponse.json();
    const nextLists = [...globalState.lists];
    const whichList = nextLists.findIndex(
      (list) => list._id === commentResponse.comment.list._id
    );
    nextLists[whichList].comments.data = nextLists[
      whichList
    ].comments.data.filter((com) => com._id !== commentResponse.comment._id);
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
        <List
          onNewComment={onNewComment}
          onCommentDelete={onCommentDelete}
          onNewSubComment={onNewSubComment}
          onSubCommentDelete={onSubCommentDelete}
          path="list/:slug"
        />
      </Router>
    </div>
  );
}
