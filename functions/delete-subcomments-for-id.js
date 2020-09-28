var faunadb = require("faunadb"),
  q = faunadb.query;

require("dotenv").config();
var serverClient = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET,
});
//TODO: https://github.com/netlify/netlify-faunadb-example
//TODO: delete the comment itself
exports.handler = async (event, ctx, callback) => {
  const { ids } = JSON.parse(event.body);

  const deleteAllSubComments = ids.map((id) => {
    return q.Delete(q.Ref(`classes/SubComment/${id._id}`));
  });

  console.log(ids);
  // Hit fauna with the query to delete the completed items
  return serverClient
    .query(deleteAllSubComments)
    .then((response) => {
      console.log("success", response);
      return {
        statusCode: 200,
        body: JSON.stringify(response),
      };
    })
    .catch((error) => {
      console.log("error", error);
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      };
    });

  /*
    

Delete(
  Select(
    "ref",
    Get(
      Match(Index("parent"), 10)
    )
  )
)


    */
  /*console.log(id);

  return {
    statusCode: 200,
    body: JSON.stringify({ msg: "yeah" }),
  };*/

  /*try {
    serverClient
      .query(q.Delete(q.Ref(q.Collection("SubComment"), "277545958974161415")))
      .then((ret) => console.log(ret));
  } catch (ex) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Yeah it happened" }),
    };
  }*/
};
