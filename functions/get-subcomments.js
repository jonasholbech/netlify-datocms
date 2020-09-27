const sendQuery = require("./helpers/send-query");

exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  console.log(id);
  const GET_ALL_SUBCOMMENTS = `
query {
    subCommentsByParent(parentId:"${id}"){
      data {
        _id
      }
    }
  }
`;
  const { data, errors } = await sendQuery(GET_ALL_SUBCOMMENTS);
  console.log(data);
  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ subcomments: data.subCommentsByParent.data }),
  };
};
