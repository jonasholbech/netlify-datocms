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
    console.log(data);
  };
  const getLists = async () => {
    const response = await fetch("/api/get-all-lists");
    const data = await response.json();
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
          lists={lists}
          username={username}
          path="list/:slug"
        />
      </Router>
    </div>
  );
}
