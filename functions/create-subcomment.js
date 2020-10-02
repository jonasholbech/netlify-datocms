require("dotenv").config();
const { SiteClient } = require("datocms-client");
const client = new SiteClient(process.env.DATO_CMS_CONTENT_KEY);
exports.handler = async (event) => {
  const { comment, author, parentid } = JSON.parse(event.body);
  async function createRecord() {
    try {
      const record = await client.items.create({
        itemType: "321427", // model ID
        comment,
        author,
        parentid,
      });
      const parentRecord = await client.items.find(parentid);

      client.items.update(parentid, {
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
