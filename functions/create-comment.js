require("dotenv").config();
const { SiteClient } = require("datocms-client");
const client = new SiteClient(process.env.DATO_CMS_CONTENT_KEY);
exports.handler = async (event) => {
  const { comment, author, list } = JSON.parse(event.body);
  async function createRecord() {
    const record = await client.items.create({
      itemType: "321426", // model ID
      comment,
      author,
      list,
      comments: [],
    });
    const parentRecord = await client.items.find(list);

    try {
      client.items.update(list, {
        comments: parentRecord.comments.concat(record.id),
      });
      return {
        statusCode: 200,
        body: JSON.stringify(record),
      };
    } catch (e) {
      return {
        statusCode: 500,
        body: JSON.stringify(e),
      };
    }
  }
  return createRecord();
};
