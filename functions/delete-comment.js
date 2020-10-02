require("dotenv").config();
const { SiteClient } = require("datocms-client");
const client = new SiteClient(process.env.DATO_CMS_CONTENT_KEY);
exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);

  async function deleteRecord() {
    //jeg behøver ikke slette SC fra faderen, det sker automatisk
    const children = await client.items.all({
      filter: {
        type: "subcomment",
        fields: {
          parentid: { eq: id },
        },
      },
    });
    console.log(children);
    const ids = children.map((child) => child.id);
    const batch = await client.items.batchDestroy({
      "filter[ids]": ids.join(","),
    });
    const item = await client.items.destroy(id);
    if (item) {
      return {
        statusCode: 200,
        body: JSON.stringify(item),
      };
    } else {
      return {
        statusCode: 500, //TODO: den her bliver nok aldrig ramt
        body: JSON.stringify(item),
      };
    }
  }

  const retVal = await deleteRecord();
  console.log({ retVal });
  return retVal;
};
