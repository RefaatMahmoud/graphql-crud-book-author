const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/RootSchema");
const app = new express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(8000, () => {
  console.log("server is started at port 8000");
});
