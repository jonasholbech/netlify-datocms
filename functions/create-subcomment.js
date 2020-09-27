const sendQuery = require("./helpers/send-query");

const CREATE_SUBCOMMENT = `
mutation ($comment: String!, $author:String!, $parent:ID!, $parentId:String!) {
    createSubComment(data: {
      comment:$comment
      author:$author
      parent: {connect:$parent}
      parentId:$parentId
    }) {
      _id
      comment
      author
    }
  }
`;
exports.handler = async (event) => {
  const { comment, author, parent } = JSON.parse(event.body);
  let parentId = parent.toString();

  const { data, errors } = await sendQuery(CREATE_SUBCOMMENT, {
    comment,
    author,
    parent,
    parentId,
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
