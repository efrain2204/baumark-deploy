import React from "react";
import ReactDOM from "react-dom/client";
import HStoreApp from "./HStoreApp";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  from,
  ApolloLink,
  createHttpLink
} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';


// const authMiddleware = new ApolloLink((operation, forward) => {
//   // add the authorization to the headers
//   operation.setContext(({ headers = {} }) => ({
//     headers: {
//       ...headers,
//       authorization: "bearer " +localStorage.getItem('token') || null,
//     }
//   }));

//   return forward(operation);
// })

// const client = new ApolloClient({
//   uri: "http://3.91.149.21:3001/graphql/",
//   cache: new InMemoryCache(),
//   link: from([
//     authMiddleware,
//   ]),
// });


const httpLink = createHttpLink({
  uri: 'http://3.91.149.21:3001/graphql/',
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <HStoreApp />
  </ApolloProvider>
);
