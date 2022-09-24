require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');

//mount graphqlHTTP to handle graphql requests and responses
const { graphqlHTTP } = require('express-graphql');
const graphQlSchema  = require('./graphql/schema/index');
const graphQlResolvers  = require('./graphql/resolvers/index');

const { createTunnel } = require('./helpers/tunnel');

const { PORT: port } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(routes);

// one endpoint for all graphql queries, mutations, and subscriptions
app.use('/graphql', graphqlHTTP({
  //where we define our schema
  schema: graphQlSchema,
  //where we define our resolvers
  rootValue: graphQlResolvers,
  //enable graphiql for development
  graphiql: true,
}));

//connect to mongodb
const mongoUser = "moazmoshtha";
const mongoPassword = "sGEWKyUS0Evra5kK";
const mongoUrl = `mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.xdilpjh.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    createTunnel(port);
  });
}).catch(err => {
  console.log(err);
});
module.exports = app;
