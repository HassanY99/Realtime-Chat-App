import React from 'react'
import { useQuery, gql } from '@apollo/client';

const GET_MESSAGES = gql `
query {
    messages {
      id
      text
      user
    }
  }
`;

const Messages = ({ user }) => {

        const { data } = useQuery(GET_MESSAGES);

        if(!data) {
            return null;
        }

        return (
            <div>
                {data.messages.map(({ id, user: messageUser, text }) => (
                    <div
                    style={{
                        display: 'flex',
                        justifyContent: user === messageUser ? 'flex-end' : 'flex-start',
                        paddingBottom : '1em',
                        paddingTop: '10px'
                    }}>

                        <div
                        style={{
                            background: user === messageUser ? '#2E8BC0' : '#B9B7BD',
                            color: user === messageUser ? "white" : "black",
                            borderRadius: "1em",
                            padding: '1em',
                            maxWidth: '60%'
                        }}>
                            {text}
                        </div>

                    </div>
                ))}
            </div>
        )
        // console.log(JSON.stringify(data.messages[0].text));
}

export default Messages
