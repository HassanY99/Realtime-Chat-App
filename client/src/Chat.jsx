import React, { useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useMutation } from '@apollo/client';
import Messages from './Messages';
import { WebSocketLink } from "@apollo/client/link/ws";

// Chards imp
import { Container, Row, Col, FormInput, Button } from 'shards-react';

const link = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link,
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

// Mutation create Post
const POST_MESSAGE = gql`
    mutation($user: String!, $text: String!) {
        postMessage(user: $user, text: $text)
    }
`;


const Chat = () => {
    const [state, setState] = useState({
        user: "John",
        text: ""
    });

    const [postMessage] = useMutation(POST_MESSAGE);

    const onSend = () => {
        if(state.text.length > 0) {
            postMessage({
                variables: state
            });
        }

        setState({
            ...state,
            text: ''
        });
    }

  return (
    <Container>
        <Messages user={state.user}/>
        <Row style={{padding: 20 }}>
            {/* User can change name */}
            <Col xs={2} style={{padding: 0 }}>
                <FormInput 
                label="User"
                placeholder="Name"
                value={state.user}
                onChange = {(e) => setState({
                    ...state,
                    user: e.target.value
                })}
                >
                </FormInput>
            </Col>
            {/* User can enter text */}
            <Col xs={8}>
                <FormInput 
                label="Text"
                placeholder="Enter your text message"
                value={state.text}
                onChange = {(e) => setState({
                    ...state,
                    text: e.target.value
                })
            }
            onKeyUp={(e) => {
                if(e.keyCode === 13) {
                    onSend();
                }
            }}
                >
                </FormInput>
            </Col>
            {/* User can send text */}
            <Col xs={2}>
                <Button 
                onClick={() => onSend()}
                >Send</Button>
            </Col>
        </Row>
    </Container>
  )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>  (
<ApolloProvider client={client}>
    <Chat />
</ApolloProvider>
);
