const sendQuery = require("./helpers/send-query");

const CREATE_COMMENT = `
mutation ($comment: String!, $author: String!, $list: ID!) {
    createComment(data: {
      comment:$comment
      author:$author
      list: {connect:$list}
    }) {
      _id
      comment
      author
      comments {
        data {
          _id
          comment
          author
        }
      }
      list {
        _id
        title
      }
    }
  }
`;
const CREATE_SUBCOMMENT = `
mutation ($comment: String!, $author:String!, $parent:ID!) {
    createSubComment(data: {
      comment:$comment
      author:$author
      parent: {connect:$parent}
    }) {
      _id
      comment
      author
    }
  }
`;
exports.handler = async (event) => {
  const { comment, author, parent } = JSON.parse(event.body);
  const { data, errors } = await sendQuery(CREATE_SUBCOMMENT, {
    comment,
    author,
    parent,
  });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ comment: data.createSubComment }),
  };
};
