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
exports.handler = async (event) => {
  const { comment, author, list } = JSON.parse(event.body);
  const { data, errors } = await sendQuery(CREATE_COMMENT, {
    comment,
    author,
    list,
  });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ comment: data.createComment }),
  };
};
