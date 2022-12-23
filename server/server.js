const {GraphQLServer, PubSub} = require('graphql-yoga');


// An array of messages
const messages = [];

// Set Schema, Query, Mutation(Post REQ to post message) and Subscription for realtime data updates
const typeDefs = `
    type Message {
        id: ID!,
        user: String!,
        text: String!
    } 

    type Query {
        messages: [Message!]
    }

    type Mutation {
        postMessage(user: String!, text: String!) : String!
    }

    type Subscription {
        messages: [Message!]
    }
`;

// Create PublishSubscribe
const pubsub = new PubSub();

// Create array of subscribers;
const subscribers = [];
const onMessageUpdate = (s) => subscribers.push(s); // every time user subscribes gets added to the array

// Create functions to send responses
const resolvers = {
    Query: {
        messages: () => messages,
    },
    Mutation: {
        postMessage: (parent, {user, text}) => {
            const id = messages.length;
            messages.push({
                id,
                user,
                text
            });
            subscribers.forEach((s) => s());
            return text;
        }
    },
    Subscription: {
        messages: {
            subscribe: (args, parent, { pubsub }) => {
                const channel = Math.random().toString(36).slice(2, 15);
                onMessageUpdate(() => pubsub.publish(channel, { messages }));
                setTimeout(() => pubsub.publish(channel, {messages}), 0);
                return pubsub.asyncIterator(channel);
            }
        }
    }
}

// Server initiated
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub }});
server.start(({port}) => {
    console.log(`Server running on http://localhost:${port}/`); 
})
















// const { GraphQLServer, PubSub } = require("graphql-yoga");

// const messages = [];

// const typeDefs = `
//   type Message {
//     id: ID!
//     user: String!
//     text: String!
//   }
//   type Query {
//     messages: [Message!]
//   }
//   type Mutation {
//     postMessage(user: String!, text: String!): ID!
//   }
//   type Subscription {
//     messages: [Message!]
//   }
// `;

// const subscribers = [];
// const onMessagesUpdates = (fn) => subscribers.push(fn);

// const resolvers = {
//   Query: {
//     messages: () => messages,
//   },
//   Mutation: {
//     postMessage: (parent, { user, text }) => {
//       const id = messages.length;
//       messages.push({
//         id,
//         user,
//         text,
//       });
//       subscribers.forEach((fn) => fn());
//       return id;
//     },
//   },
//   Subscription: {
//     messages: {
//       subscribe: (parent, args, { pubsub }) => {
//         const channel = Math.random().toString(36).slice(2, 15);
//         onMessagesUpdates(() => pubsub.publish(channel, { messages }));
//         setTimeout(() => pubsub.publish(channel, { messages }), 0);
//         return pubsub.asyncIterator(channel);
//       },
//     },
//   },
// };

// const pubsub = new PubSub();
// const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
// server.start(({ port }) => {
//   console.log(`Server on http://localhost:${port}/`);
// });