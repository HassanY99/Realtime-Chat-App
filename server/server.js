const { createServer } = require('http');
const { createSchema, createYoga } = require('graphql-yoga')


const messages = [];

createServer(
    createYoga({
      schema: createSchema({
        typeDefs: /* GraphQL */ `
        type Message {
            id: ID!,
            user: String!,
            text: String!
        }

        type Query {
            messages: [Message!]
        }

        type Mutation {
            postMessage(user: String!, text: String!): ID!
        }
        `,
     // Now Get the "DATA";
        resolvers: {
          Query: {
            messages: () => messages,
          },
        //   Post request
          Mutation: {
            postMessage : (parent, {user, text}) => {
                const id = messages.length;
                messages.push({
                    id,
                    user,
                    text
                });
                return id;
            }
        }
    },
      })
    })
  ).listen(4000, () => {
    console.log('GraphQL Yoga is listening on http://localhost:4000/graphql')
  });