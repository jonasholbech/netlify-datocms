import React, { useContext } from "react";
import { Link } from "@reach/router";
import Appbar from "muicss/lib/react/appbar";
import Button from "muicss/lib/react/button";
import { store } from "../reducer/store.js";
const Nav = () => {
  const { globalState, dispatch } = useContext(store);
  return (
    <Appbar>
      <nav className="Nav">
        {globalState.lists.map((list) => {
          return (
            <Link key={list._id} to={`/list/${list.slug}`}>
              <Button>{list.title}</Button>
            </Link>
          );
        })}
      </nav>
    </Appbar>
  );
};
export default Nav;
