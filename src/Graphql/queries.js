// Define mutation
import { gql } from "@apollo/client";

export const INCREMENT_COUNTER = gql`
  mutation ($email: String!, $pwd: String!) {
    login(loginUserInput: { email: $email, password: $pwd }) {
      access_token
      user {
        id
        names
        surnames
        email
        createdAt
      }
    }
  }
`;