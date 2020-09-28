const sendQuery = require("./helpers/send-query");

const DELETE_SUBCOMMENT = `
mutation ($id: ID!) {
    deleteSubComment(id:$id){
        _id
        parent {
          _id
          list {
            _id
          }
        }
      }
  }
`;
exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  const { data, errors } = await sendQuery(DELETE_SUBCOMMENT, {
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
    body: JSON.stringify({ comment: data.deleteSubComment }),
  };
};
