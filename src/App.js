import React, { useContext, useEffect } from "react";
import { Router } from "@reach/router";
import useInterval from "@use-it/interval";

import { store } from "./reducer/store.js";
import getLists from "./utils/getLists";
import { fetchInterval } from "./utils/settings";
import Nav from "./comps/Nav";
import Home from "./comps/Home";
import List from "./comps/List";
import "./App.css";

export default function App() {
  const { globalState, dispatch } = useContext(store);

  useInterval(() => {
    if (!globalState.username) {
      return;
    }
    dispatch({ type: "loading" });
    getLists(dispatch);
  }, fetchInterval);

  useEffect(() => {
    getLists(dispatch);
  }, [globalState.username, dispatch]);
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
