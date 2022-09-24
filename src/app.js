require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

//mount graphqlHTTP to handle graphql requests and responses
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const root = require('./graphql/resolvers');

const { createTunnel } = require('./helpers/tunnel');

const { PORT: port } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(routes);

// one endpoint for all graphql queries, mutations, and subscriptions
app.use('/graphql', graphqlHTTP({
  //where we define our schema
  schema: schema,
  //where we define our resolvers
  rootValue: root,

  graphiql: true,
}));

app.listen(port, () => {
  createTunnel(port);
});

module.exports = app;
