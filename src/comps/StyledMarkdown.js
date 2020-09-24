import React from "react";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

const StyledMarkdown = ({ content }) => {
  return <ReactMarkdown source={content} renderers={{ code: CodeBlock }} />;
};
export default StyledMarkdown;
