import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import AppIndex from "./AppIndex";
import Login from "./Login";
import ErrorPage from "./ErrorPage";
import Assignment, { loadAssignment } from "./Assignment";

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
    <RouterProvider router={router} />
  </React.StrictMode>
);
