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

        return JSON.stringify(data);
}

export default Messages
