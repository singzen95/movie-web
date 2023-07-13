import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface MovieResult {
  imdbID: string;
  Poster: string;
  Title: string;
}

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<MovieResult[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=28f4dae9&s=${searchTerm}`
      );
      setSearchResults(response.data.Search || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter movie title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {searchResults.map((movie) => (
          <li key={movie.imdbID}>
            <Link to={`/movie/${movie.imdbID}`}>
              <img src={movie.Poster} alt={movie.Title} />
            </Link>
            <p>{movie.Title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchScreen;
