import React from "react";
import StyledMarkdown from "./StyledMarkdown";
const SubComment = ({ sc, username }) => {
  return (
    <li>
      <span className="author">{sc.author}</span>
      <StyledMarkdown content={sc.comment} />
      {sc.author === username && <button>Delete</button>}
    </li>
  );
};
export default SubComment;
