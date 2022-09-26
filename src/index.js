import React from "react";
import ReactDOM from "react-dom/client";
import HStoreApp from "./HStoreApp";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://3.91.149.21:3001/graphql/",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <HStoreApp />
  </ApolloProvider>
);
