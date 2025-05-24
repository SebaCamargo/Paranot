import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Rating } from "react-simple-star-rating";
import "../App.css";

function Pagination() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [stars, setStars] = useState(0);

  const apikey = "1f6c05af9a052262cc5f79b5bbfe674b";

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=popularity.desc&page=${page}`
      )
      .then((response) => {
        setMovies(response.data.results);
      });
  }, [page]);

  useEffect(() => {
    const filtered = movies.filter((movie) => {
      const starsFromVote = Math.round(movie.vote_average / 2);
      return stars === 0 || starsFromVote === stars;
    });
    setFilteredMovies(filtered);
  }, [movies, stars]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRating = (rate) => {
    setStars(rate);
  };

  const resetFilter = () => {
    setStars(0);
  };

  return (
    <div>
      <div className="stars">
        <h2>Filtrar por rating:</h2>
        <Rating
          onClick={handleRating}
          initialValue={stars}
          allowFraction={false}
          size={20}
          fillColor="gold"
          emptyColor="#ccc"
        />
        <button onClick={resetFilter} className="reset-button">
          Reset
        </button>
      </div>

      <div className="movies">
        {filteredMovies.length === 0 ? (
          <h1 className="no-movies">
            Lo sentimos, no se encontraron películas con el rating solicitado.
          </h1>
        ) : (
          filteredMovies.map((film) => (
            <Link to={`/moviedetail/${film.id}`} key={film.id}>
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

      <div className="pagination-buttons">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="pagination-button"
        >
          Previous
        </button>

        <button
          onClick={() => handlePageChange(page + 1)}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
