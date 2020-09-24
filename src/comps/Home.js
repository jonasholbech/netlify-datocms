import React, { useState } from "react";
const Home = ({ username, setUsername }) => {
  const [userNameInput, setUserNameInput] = useState("");

  function submit(e) {
    e.preventDefault();
    setUsername(userNameInput);
  }
  return (
    <div className="Home">
      {!username ? (
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
        <h1>Velkommen tilbage {username}</h1>
      )}
    </div>
  );
};
export default Home;
