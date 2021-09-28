import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { persistCache, LocalStorageWrapper } from "apollo3-cache-persist";
import App from "./App";

const Client = () => {
  const [client, setClient] = React.useState();

  React.useEffect(() => {
    async function init() {
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
      });
      setClient(
        new ApolloClient({
          uri: "https://countries.trevorblades.com",
          cache,
        })
      );
    }

    init().catch(console.error);
  }, []);

  if (!client) {
    return <h2>Initializing the app...</h2>;
  }

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Client />
  </React.StrictMode>,
  document.getElementById("root")
);
