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

//kan ikke lade sig gøre umiddelbart, hvis gammelt er slettet skal systemet vide det
//kunne evt gøre via et webhook, meen....

//hvad nu hvis
Vi henter alt ved første load, og appender alt nyt?
Det ville ikke give os oplysninger om slettede
const event = new Date('05 October 2011 14:48 UTC');
console.log(event.toString());
// expected output: Wed Oct 05 2011 16:48:00 GMT+0200 (CEST)
// (note: your timezone may vary)

console.log(event.toISOString());
// expected output: 2011-10-05T14:48:00.000Z

Kunne man: hente alt, gemme i local storage
fetchInterval, hente det nyeste
fetchInterval x 10 hente alt og køre diff / overskrive state?
Bedste ide so far
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
