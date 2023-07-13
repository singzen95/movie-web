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
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=28f4dae9&s=${searchTerm}`
      );
      setSearchResults(response.data.Search || []);
      setSearched(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSearchResult = () => {
    if (!searched) {
      return null;
    }
    if (searchResults.length === 0) {
      return <p>No result</p>;
    }
    return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-6 g-5">
        {searchResults.map((movie) => (
          <div className="col" key={movie.imdbID}>
            <div className="card h-100">
              <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
              <div className="card-body">
                <h5 className="card-title">{movie.Title}</h5>
                <Link to={`/movie/${movie.imdbID}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="input-group mb-3">
        <input type="text" className="form-control" id="floatingInput" placeholder="Enter movie title" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} disabled={loading} aria-label="Movie title" aria-describedby="button-addon2"></input>
        <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSearch} disabled={loading}>Search</button>
      </div>
      <ul>{handleSearchResult()}</ul>
    </div>
  );
};

export default SearchScreen;
