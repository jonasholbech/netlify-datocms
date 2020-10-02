# Notes and libs used

1. https://react.useanimations.com/
2. https://reach.tech/router/
3. https://www.muicss.com/docs/v1/react/introduction
4. https://github.com/alex-cory/react-useportal
5.

## TODO

simplify loading graphql (more smaller queries) => simpler state
collapse code blocks: https://www.npmjs.com/package/react-syntax-highlighter kan være noget derinde jeg kan bruge

lazy load på forside: ✓
lazy load på submoduler: ❓ vil jeg det?

TODO: load kun det
//første request kunne gå til fetch all
//requests i interval kunne gå til fetch newest
//men jeg skal så "merge" data manuelt så state ikke overskrives
const event = new Date('05 October 2011 14:48 UTC');
console.log(event.toString());
// expected output: Wed Oct 05 2011 16:48:00 GMT+0200 (CEST)
// (note: your timezone may vary)

console.log(event.toISOString());
// expected output: 2011-10-05T14:48:00.000Z

{
allComments(filter:{createdAt:{gt:"2020-10-01 11:30:16"}}) {
id
createdAt
comment
author
list {
id
}
}
}

## `npm run start-local`
