const sendQuery = require("./helpers/send-query");

exports.handler = async (event) => {
  const { query } = JSON.parse(event.body);
  const { data, errors } = await sendQuery(query);

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ newNote: data.createNote }),
  };
};
