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
    if (!globalState.loading || !globalState.username) return;

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

  return (
    <div className="App">
      <Nav />
      <Router>
        <Home path="/" />
        <List path="list/:slug" />
      </Router>
    </div>
  );
}
