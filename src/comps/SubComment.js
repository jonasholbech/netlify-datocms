import React, { useState } from "react";
import StyledMarkdown from "./StyledMarkdown";
import UseAnimations from "react-useanimations";
import loading2 from "react-useanimations/lib/loading2";
import Button from "muicss/lib/react/button";
const SubComment = ({ sc, username, onSubCommentDelete }) => {
  const [beingDeleted, setBeingDeleted] = useState(false);
  function deleteSub() {
    setBeingDeleted(true);
    onSubCommentDelete(sc._id, () => {
      setBeingDeleted(false);
    });
  }
  return (
    <li className="SubComment">
      <section>
        <span className="author">{sc.author}</span>
        <StyledMarkdown content={sc.comment} />
      </section>
      {sc.author === username && (
        <Button
          size="small"
          onClick={deleteSub}
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
