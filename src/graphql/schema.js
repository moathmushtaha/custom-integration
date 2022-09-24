const { buildSchema } = require('graphql');

//query for getting data
//mutation for updating, creating, or deleting data
const schema = buildSchema(`
  type Query {
    hello: String
  },
  type Mutation {
    createHello: String
  }
`);
