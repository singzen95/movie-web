import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchScreen from "./components/SearchScreen";
import MovieDetailsScreen from "./components/MovieDetailsScreen";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: SearchScreen(),
    },
    {
      path: "/movie/:imdbID",
      element: MovieDetailsScreen(),
    },
  ]);

  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
};

export default App;
