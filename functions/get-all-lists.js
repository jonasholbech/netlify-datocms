const sendQuery = require("./helpers/send-query");

const GET_ALL_DATA = `
query {
    allLists {
      createdAt
      id
      title
      slug
      comments {
        id
        author
        comment
        createdAt
        list {
          id
        }
        comments {
          id
          comment
          author
          parentid {
            id
          }
          createdAt
        }
      }
    }
  }
`;

exports.handler = async () => {
  const { data, errors } = await sendQuery(GET_ALL_DATA);

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify(errors),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ lists: data.allLists }),
  };
};
