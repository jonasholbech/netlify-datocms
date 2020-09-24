import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";

import Nav from "./comps/Nav";
import Home from "./comps/Home";
import List from "./comps/List";

export default function App() {
  const [status, setStatus] = useState("loading");
  const [lists, setLists] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem("username"));

  const setUsernameCallback = (un) => {
    setUsername(un);
    localStorage.setItem("username", un);
  };
  const onNewComment = async (payload) => {
    payload.author = username;
    const response = await fetch("/api/create-comment", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    const nextLists = [...lists];
    const whichList = nextLists.findIndex((list) => list._id === payload.list);
    nextLists[whichList].comments.data = nextLists[
      whichList
    ].comments.data.concat(data.comment);
    setLists(nextLists);
  };
  const onNewSubComment = async (payload) => {
    console.log(payload);
    const newPayload = {
      comment: payload.comment,
      author: username,
      parent: payload.commentId,
    };
    const response = await fetch("/api/create-subcomment", {
      method: "POST",
      body: JSON.stringify(newPayload),
    });
    const data = await response.json();
    console.log(data.comment);

    const nextLists = [...lists];
    const whichList = nextLists.findIndex(
      (list) => list._id === payload.listId
    );
    const whichComment = nextLists[whichList].comments.data.findIndex(
      (comment) => comment._id === payload.commentId
    );
    nextLists[whichList].comments.data[whichComment].comments.data = nextLists[
      whichList
    ].comments.data[whichComment].comments.data.concat(data.comment);
    /*nextLists[whichList].comments.data = nextLists[
      whichList
    ].comments.data.concat(data.comment);
    */
    setLists(nextLists);
  };
  const getLists = async () => {
    const response = await fetch("/api/get-all-lists");
    const data = await response.json();
    console.table(data.lists);
    setLists(data.lists);
    setStatus("loaded");
  };

  useEffect(() => {
    if (status !== "loading") return;
    if (!username) return;
    getLists();
  }, [status, username]);
  return (
    <div className="App">
      <Nav lists={lists} username={username} />
      <Router>
        <Home path="/" username={username} setUsername={setUsernameCallback} />
        <List
          onNewComment={onNewComment}
          onNewSubComment={onNewSubComment}
          lists={lists}
          username={username}
          path="list/:slug"
        />
      </Router>
    </div>
  );
}
