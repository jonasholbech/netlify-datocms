const sendQuery = require("./helpers/send-query");

const DELETE_COMMENT = `
mutation ($id: ID!) {
    deleteComment(id:$id){
        _id
        list {
          _id
        }
      }
  }
`;
exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  const { data, errors } = await sendQuery(DELETE_COMMENT, {
    id,
  });

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ comment: data.deleteComment }),
  };
};
