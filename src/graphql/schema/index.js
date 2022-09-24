const { buildSchema } = require('graphql');

/**
 * @description
 * This is the main schema file for the graphql server, define the item schema
 * and the queries and mutations for the item model, item query for get items,
 * item mutation for create and update items.
 */
module.exports = buildSchema(`
    type Item {
        _id: ID!
        name: String!
        description: String!
        status: String!
    }

    input ItemInput {
        name: String!
        description: String!
        status: String!
    }

    type RootQuery {
        items: [Item!]!
    }

    type RootMutation {
        createItem(itemInput: ItemInput): Item,
        updateItem(_id: ID!, itemInput: ItemInput): Item,
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
