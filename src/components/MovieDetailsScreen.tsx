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
        console.log("http://www.omdbapi.com/?apikey=28f4dae9&i=${imdbID}");
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=28f4dae9&i=${imdbID}`
        );

        if (response.data.Response === "True") {
          setMovieDetails(response.data);
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

  return (
    <div>
      <img src={movieDetails.Poster} alt={movieDetails.Title} />
      <p>Title: {movieDetails.Title}</p>
      <p>Type: {movieDetails.Type}</p>
      <p>Year: {movieDetails.Year}</p>
      <p>IMDB ID: {movieDetails.imdbID}</p>
    </div>
  );
};

export default MovieDetailsScreen;
