import React, { useContext } from "react";
import { Link } from "@reach/router";
import UseAnimations from "react-useanimations";
import activity from "react-useanimations/lib/activity";
import Appbar from "muicss/lib/react/appbar";
import Button from "muicss/lib/react/button";
import { store } from "../reducer/store.js";
const Nav = () => {
  const { globalState } = useContext(store);
  return (
    <Appbar>
      <nav className="Nav">
        {globalState.lists.map((list) => {
          return (
            <Link key={list.id} to={`/list/${list.slug}`}>
              <Button>{list.title}</Button>
            </Link>
          );
        })}
        {globalState.loading && (
          <UseAnimations
            animation={activity}
            className="useAnimations"
            size={30}
            strokeColor="white"
          />
        )}
      </nav>
    </Appbar>
  );
};
export default Nav;
