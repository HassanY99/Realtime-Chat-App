import React from 'react'
import { gql, useSubscription } from '@apollo/client';

const GET_MESSAGES = gql`
    subscription {
        messages {
            id
            user
            text
    }
}
`;

const Messages = ({ user }) => {

        const { data } = useSubscription(GET_MESSAGES);

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
                        paddingTop: '3px'
                    }}>
                        {/* Get the first two letters of the user name */}
                        {user !== messageUser && (
                            <div style={{
                                height: 40,
                                width: 40,
                                marginRight: '10px',
                                marginTop: '11px',
                                border: '2px solid #868B8E',
                                borderRadius: 35,
                                padding: 5,
                                textAlign: 'center',
                                fontSize: '13pt',
                                paddingTop: 4


                            }}>
                                {messageUser.slice(0,2).toUpperCase()}
                            </div>
                        )}
                        {/* Get Text from the data */}
                        <div
                        style={{
                            background: user === messageUser ? '#2E8BC0' : '#B9B7BD',
                            color: user === messageUser ? "white" : "black",
                            borderRadius: "14px",
                            padding: "12px",
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
