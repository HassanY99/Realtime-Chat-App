const { createServer } = require('node:http');
const { createSchema, createYoga, createPubSub } = require('graphql-yoga')
// import { PubSub } from 'graphql-subscriptions';

const pubSub = createPubSub();


const messages = [];

// const pubSub = createPubSub();


const yoga = createYoga({
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

        type Subscription {
            messages: [Message!]
        }
        `,
     // Now Get the "DATA";
        resolvers: {
          Query: {
            messages: () => messages,
          },
        //   Post request
          Mutation: {
            postMessage : (_, {user, text}) => {
                pubSub.publish("postMessage", messages);
                const id = messages.length;
                messages.push({
                    id, user, text
                })
                return id;
            }
        },
        Subscription: {
            messages: {
                subscribe: () => pubSub.subscribe("postMessage"),
                resolve: (payload) => payload,
              },
            }
          }
        })
      })

 const server = createServer(yoga)
 server.listen(4000, () => { 
    console.info('Server is running on http://localhost:4000/graphql')
});