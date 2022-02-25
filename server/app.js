const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { default: mongoose } = require("mongoose");
const databaseConfig = require("./config/database.config");
const schema = require("./schema/RootSchema");
const app = new express();
var cors = require("cors");

app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Connecting to the database
mongoose
  .connect(databaseConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.listen(8000, () => {
  console.log("server is started at port 8000");
});
