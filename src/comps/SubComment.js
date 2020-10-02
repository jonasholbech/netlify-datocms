import React, { useState, useContext } from "react";
import StyledMarkdown from "./StyledMarkdown";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import Button from "muicss/lib/react/button";
import { store } from "../reducer/store.js";

const SubComment = ({ sc }) => {
  const { globalState, dispatch } = useContext(store);
  const [beingDeleted, setBeingDeleted] = useState(false);

  async function onSubCommentDelete() {
    setBeingDeleted(true);
    const promise = await fetch("/api/delete-subcomment", {
      method: "POST",
      body: JSON.stringify({ id: sc.id }),
    });
    const data = await promise.json();
    dispatch({
      type: "deleteSubComment",
      payload: {
        scID: data.id,
        coID: data.parentid,
      },
    });
  }
  return (
    <li className="SubComment">
      <section>
        <span className="author">{sc.author}</span>
        <StyledMarkdown content={sc.comment} />
      </section>
      {(sc.author === globalState.username || globalState.godMode) && (
        <Button
          size="small"
          onClick={onSubCommentDelete}
          variant="raised"
          color="danger"
        >
          {beingDeleted ? (
            <UseAnimations
              animation={loading2}
              className="useAnimations"
              size={30}
              strokeColor="white"
            />
          ) : (
            "Slet"
          )}
        </Button>
      )}
    </li>
  );
};
export default SubComment;
