// Define mutation
import { gql } from "@apollo/client";

export const LOGIN = gql`
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

export const REGISTER = gql`
  mutation (
    $email: String!
    $names: String!
    $surnames: String!
    $password: String!
    $dateBirth: Date!
  ) {
    createUser(
      createUserInput: {
        email: $email
        names: $names
        surnames: $surnames
        password: $password
        dateBirth: $dateBirth
      }
    ) {
      access_token
      user {
        id
        names
        email
      }
    }
  }
`;

export const GET_USERS = gql`
  query {
    users(
      surnames: ""
      email: ""
      advancedSearch: true
      names: ""
      page: 1
      row: 10
    ) {
      id
      email
      names
      surnames
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation (
    $id:String!
  ){
    removeUser(id: $id) {
      id
      email
      names
      surnames
      dateBirth
      createdAt
    }
  }
`;
