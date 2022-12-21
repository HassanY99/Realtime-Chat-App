import React from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';
import Messages from './Messages';

// Chards imp
import { Container } from 'shards-react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});



const Chat = () => {
  return (
    <Container>
        <Messages user="John"/>
    </Container>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>  (
<ApolloProvider client={client}>
    <Chat />
</ApolloProvider>
);
