import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import "../App.css";
import { Link } from "react-router";

function Movies({ movies }) {
  const [stars, setStars] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState(movies);

  const handleRating = (rate) => {
    setStars(rate);
  };

  useEffect(() => {
    const filtered = movies.filter((movie) => {
      const starsFromVote = Math.round(movie.vote_average / 2);
      return stars === 0 || starsFromVote === stars;
    });

    setFilteredMovies(filtered);
  }, [stars, movies]);

  return (
    <div>
      <div className="stars">
        <h1>Filtrar por rating:</h1>
        <Rating
          onClick={handleRating}
          initialValue={stars}
          allowFraction={false}
          size={20}
          fillColor="gold"
          emptyColor="#ccc"
        />
        <h2>& Más</h2>
      </div>

      <div className="movies">
        {filteredMovies.length === 0 ? (
          <h1 className="no-movies">
            Lo sentimos, no se encontraron películas con el rating solicitado.
          </h1>
        ) : (
          filteredMovies.map((film) => (
            <Link to={"/moviedetail/" + film.id} key={film.id}>
              <div className="movie">
                <img
                  src={`https://image.tmdb.org/t/p/w300${film.poster_path}`}
                  alt={film.title}
                />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Movies;
