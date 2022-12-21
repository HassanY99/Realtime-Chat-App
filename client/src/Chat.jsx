import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import Messages from './Messages';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});



const Chat = () => {
  return (
    <div>
        <Messages user="John"/>
    </div>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>  (
<ApolloProvider client={client}>
    <Chat />
</ApolloProvider>
);
