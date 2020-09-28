import React from "react";
import StyledMarkdown from "./StyledMarkdown";
import Button from "muicss/lib/react/button";
const SubComment = ({ sc, username }) => {
  return (
    <li className="SubComment">
      <section>
        <span className="author">{sc.author}</span>
        <StyledMarkdown content={sc.comment} />
      </section>
      {sc.author === username && (
        <Button size="small" variant="raised" color="danger">
          Delete
        </Button>
      )}
    </li>
  );
};
export default SubComment;
