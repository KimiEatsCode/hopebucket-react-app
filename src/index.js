import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";

import Bucket from "./components/Bucket";
import Newsletter from "./components/Newsletter";
import List from "./components/List";
import ListContext from "./ListContext";



import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/bucket',
    element: <Bucket />,
  },

  {
    path: '/list',
    element: <List />,
  },
  {
    path: '/newsletter',
    element: <Newsletter />,
  },
  {
    path: '/list',
    element: <list />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ListContext>

<RouterProvider router={router} />;
</ListContext>

  </React.StrictMode>

);