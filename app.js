const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors")
const dbConfig = require("config").get("db");
const app = express();


app.use(cors())


mongoose.connect(dbConfig.url)
  .then(() => console.log('Connected successfully'))
  .catch(err => console.error(err));



app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(7001, () => {
  console.log("App is listening on port " + 7001);
});
