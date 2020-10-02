import React, { useContext, useEffect } from "react";
import { Router } from "@reach/router";
import Loadable from "react-loadable";
import useInterval from "@use-it/interval";

import { store } from "./reducer/store.js";
import getLists from "./utils/getLists";
import { fetchInterval } from "./utils/settings";
import Nav from "./comps/Nav";
import { Home } from "./comps/Home";
import "./App.css";
const Loader = () => {
  return <div>Loading...</div>;
};

const AsyncList = Loadable({
  loader: () => import("./comps/List"),
  loading: Loader,
});
const AsyncGodMode = Loadable({
  loader: () => import("./comps/GodMode"),
  loading: Loader,
});

// import List from "./comps/List";
// import GodMode from "./comps/GodMode";

export default function App() {
  const { globalState, dispatch } = useContext(store);
  /*
  useInterval(() => {
    if (!globalState.username) {
      return;
    }
    dispatch({ type: "loading" });
    getLists(dispatch);
  }, fetchInterval);
  */
  useEffect(() => {
    getLists(dispatch);
  }, [globalState.username, dispatch]);
  return (
    <div className="App">
      <Nav />
      <Router>
        <Home path="/" />
        <AsyncList path="list/:slug" />
        <AsyncGodMode path="/godmode" />
      </Router>
    </div>
  );
}
