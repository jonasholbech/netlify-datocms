import React from "react";
import { Link } from "@reach/router";
import Appbar from "muicss/lib/react/appbar";
import Button from "muicss/lib/react/button";
const Nav = ({ lists }) => {
  return (
    <Appbar>
      <nav className="Nav">
        {lists.map((list) => {
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
