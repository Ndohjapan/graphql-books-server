const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema")
const mongoose = require("mongoose")

const app = express();

mongoose.connect('mongodb+srv://ndohjoelmbj16:oncHsdYImDEQyjD6@graphql.bdgwbzh.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
  console.log("connected to db")
})


app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
  console.log("App is listening on port " + 4000);
});
