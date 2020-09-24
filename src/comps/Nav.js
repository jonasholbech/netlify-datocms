import React from "react";
import { Link } from "@reach/router";
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
export default Nav;
