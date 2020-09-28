import React, { useState, useContext } from "react";
import { store } from "../reducer/store.js";
const Home = () => {
  const { globalState, dispatch } = useContext(store);
  const [userNameInput, setUserNameInput] = useState("");

  function submit(e) {
    e.preventDefault();
    dispatch({
      type: "setUsername",
      payload: userNameInput,
    });
    setUserNameInput("");
  }
  return (
    <div className="Home">
      {!globalState.username ? (
        <>
          <h1>
            Hej, kan se det er første gang du er her, hvad må jeg kalde dig?
          </h1>
          <form onSubmit={submit}>
            <input
              type="text"
              value={userNameInput}
              onChange={(e) => setUserNameInput(e.target.value)}
            />
            <button>Gem!</button>
          </form>
        </>
      ) : (
        <h1>Velkommen {globalState.username}</h1>
      )}
    </div>
  );
};
export default Home;
