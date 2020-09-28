import React, { PureComponent } from "react";
import PropTypes from "prop-types";
//import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// TODO: https://github.com/react-syntax-highlighter/react-syntax-highlighter#light-build IMPORTANT

//import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import { tomorrow as dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
//import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";

SyntaxHighlighter.registerLanguage("python", python);

class CodeBlock extends PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  };

  static defaultProps = {
    language: "python",
  };

  render() {
    const { language, value } = this.props;
    return (
      <SyntaxHighlighter
        showLineNumbers={true}
        language={language}
        style={dark}
      >
        {value}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlock;
