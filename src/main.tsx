import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AppIndex from "./AppIndex";
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import Assignment, { loadAssignment } from "./Assignment";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getToken } from "./authToken";

const queryClient = new QueryClient();

const httpLink = createHttpLink({
  uri: "https://api.github.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Using HashRouter router as the app will be hosted on GitHub Pages, which
// doesn't easily support BrowserRouter:
// https://github.com/orgs/community/discussions/36010
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <AppIndex />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/assignments/:repoPrefix",
        element: <Assignment />,
        // TODO: workarounding lack of typing here:
        // https://github.com/remix-run/react-router/discussions/9792
        loader: async ({ params }) => loadAssignment(params.repoPrefix!),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={apolloClient}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
