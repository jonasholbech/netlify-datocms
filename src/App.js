import React, { useState, useEffect } from "react";
import { Router, Link, useNavigate } from "@reach/router";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

export default function App() {
  const [status, setStatus] = useState("loading");
  const [lists, setLists] = useState([]);

  const getLists = async () => {
    const response = await fetch("/api/get-all-lists");
    const data = await response.json();
    setLists(data.lists);
    setStatus("loaded");
  };

  useEffect(() => {
    if (status !== "loading") return;
    getLists();
  }, [status]);
  return (
    <div className="App">
      <Nav lists={lists} />
      <Router>
        <Home path="/" />
        <List lists={lists} path="list/:slug" />
      </Router>
    </div>
  );
}
const Nav = ({ lists }) => {
  return (
    <nav className="Nav">
      {lists.map((list) => {
        return (
          <Link key={list._id} to={`/list/${list.slug}`}>
            {list.title}
          </Link>
        );
      })}
    </nav>
  );
};
const Home = () => {
  const [firstVisit, setFirstVisit] = useState(false);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      setFirstVisit(true);
    }
  }, []);
  function submit(e) {
    e.preventDefault();
    if (userName.length < 3) {
      return; //TODO: proper validation
    }
    localStorage.setItem("username", userName);
    setFirstVisit(false);
  }
  return (
    <div className="Home">
      {firstVisit ? (
        <>
          <h1>
            Hej, kan se det er første gang du er her, hvad må jeg kalde dig?
          </h1>
          <form onSubmit={submit}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button>Gem!</button>
          </form>
        </>
      ) : (
        <h1>Velkommen tilbage {localStorage.getItem("username")}</h1>
      )}
    </div>
  );
};
const List = ({ lists, slug }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate(`/`);
    }
  }, [navigate]);
  const thisList = lists.find((list) => list.slug === slug);

  if (!thisList) {
    return <></>;
  }
  return (
    <main className="List">
      <h1>{thisList.title}</h1>
      {thisList.comments.data.map((comment) => {
        return <Comment key={comment._id} data={comment} />;
      })}
    </main>
  );
};
const Comment = ({ data }) => {
  console.log(data);
  return (
    <article>
      <h2>{data.author}</h2>

      <StyledMarkdown content={data.comment} />
      {data.author === localStorage.getItem("username") && (
        <button>Delete</button>
      )}
    </article>
  );
};
const StyledMarkdown = ({ content }) => {
  return <ReactMarkdown source={content} renderers={{ code: CodeBlock }} />;
};
