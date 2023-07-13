import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchScreen from "./components/SearchScreen";
import MovieDetailsScreen from "./components/MovieDetailsScreen";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchScreen />} />
        <Route path="/movie/:imdbID" element={<MovieDetailsScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
