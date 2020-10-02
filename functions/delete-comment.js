//TODO: vend tilbage til den her når du kan indsætte subcomments
require("dotenv").config();
const { SiteClient } = require("datocms-client");
const client = new SiteClient(process.env.DATO_CMS_CONTENT_KEY);
exports.handler = async (event) => {
  const { id } = JSON.parse(event.body);
  async function createRecord() {
    
      const children = await client.items.all({
        filter: {
          type: "subcomment",
          fields: {
            parentid: {
              eq: id,
            },
          },
        },
      });
      const childIds = children.map((c) => c.id);
      client.items
        .batchDestroy({
          "filter[ids]": childIds.join(","),
        })
        .catch((error) => {
          return {
            statusCode: 500,
            body: JSON.stringify(e),
          };
        });
      client.items
        .destroy(id)
        .then((item) => {
          console.log(item);
        })
        .catch((error) => {
          return {
            statusCode: 500,
            body: JSON.stringify(e),
          };
        });

      return {
        statusCode: 200,
        body: JSON.stringify(record),
      };
   
      
    }
  }
  return createRecord();
};
