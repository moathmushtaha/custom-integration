require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

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

app.listen(port, () => {
  createTunnel(port);
});

module.exports = app;
