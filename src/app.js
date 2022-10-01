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

//allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
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
const mongoUrl = process.env.MONGODB_URI;
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
