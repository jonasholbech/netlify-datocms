import React, { useContext } from "react";
import Checkbox from "muicss/lib/react/checkbox";
import { store } from "../reducer/store.js";

const GodMode = () => {
  const { globalState, dispatch } = useContext(store);
  const toggle = (e) => {
    localStorage.setItem("godmode", e.target.checked);
    dispatch({ type: "toggleGodMode" });
  };

  return <Checkbox onChange={toggle} checked={globalState.godMode} />;
};
export default GodMode;
