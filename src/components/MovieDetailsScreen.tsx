import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface MovieDetails {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

const MovieDetailsScreen = () => {
  const { imdbID } = useParams();
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        console.log(`http://www.omdbapi.com/?apikey=28f4dae9&i=${imdbID}`);
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=28f4dae9&i=${imdbID}`
        );

        console.log(imdbID);

        if (response.data.Response === "True") {
          setMovieDetails(response.data);
          console.log(response.data);
        } else {
          console.log(response.data.Error);
        }

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, [imdbID]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!movieDetails) {
    return <p>No movie details found.</p>;
  }

  return <div className="container text-center">
    <div className="container">
      <h1 className="text-center">{movieDetails.Title}</h1>
      <div className="row text-center">
          <div className="col-md-6">
              <img className="" src={movieDetails.Poster} width="250px"></img>
          </div>
          <div className="col-md-6">
            <p>{movieDetails.Title} is a {movieDetails.Type} released in {movieDetails.Year}.</p>
            <p>You may find more details about this {movieDetails.Type} in IMDB website.</p>
            <a href={`https://www.imdb.com/title/${movieDetails.imdbID}`}><p>Click here to redirect to https://www.imdb.com/title/{movieDetails.imdbID}</p></a>
          </div>
      </div>
    </div>
  </div>;
};

export default MovieDetailsScreen;
