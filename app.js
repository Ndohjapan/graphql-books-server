const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors")
const dbConfig = require("config").get("db");
const app = express();
const PORT = process.env.PORT || 7001

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

app.listen(PORT, () => {
  console.log("App is listening on port " + PORT);
});
