import React, { useState, useContext } from "react";
import Form from "muicss/lib/react/form";
import Input from "muicss/lib/react/input";
import Button from "muicss/lib/react/button";

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
      <main>
        {!globalState.username ? (
          <>
            <h1>Hej</h1>
            <p>Kan se det er første gang du er her</p>
            <Form onSubmit={submit}>
              <label>
                Hvad må jeg kalde dig?
                <Input
                  type="text"
                  value={userNameInput}
                  onChange={(e) => setUserNameInput(e.target.value)}
                />
              </label>
              <Button
                disabled={userNameInput.length < 2}
                variant="raised"
                color="primary"
              >
                Gem!
              </Button>
            </Form>
          </>
        ) : (
          <>
            <h1>Velkommen {globalState.username}</h1>
            <p>Start med at vælge en liste i toppen af siden</p>
          </>
        )}
      </main>
    </div>
  );
};
export default Home;
