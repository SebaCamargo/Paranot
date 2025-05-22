import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

function MovieDetail() {
  const params = useParams();
  const [movie, setMovie] = useState([]);

  const apikey = "1f6c05af9a052262cc5f79b5bbfe674b";

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.idMovie}?api_key=${apikey}`)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      });
  }, []);

  return (
    <>
      <div
        className="movie-detail"
        style={{
          backgroundImage: `linear-gradient(rgba(144, 143, 143, 0.709)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
        }}
      >
        
        {movie.length === 0 ? (
          <h1 className="no-movies">Cargando...</h1>
        ) : (
          <div className="movie-detail">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            <div className="movie-detail-text">
              <h1>Título : {movie.title}</h1>
              <h2>
                Descripcion : <span>{movie.overview}</span>{" "}
              </h2>
              <ul>
                <li>Año de estreno : {movie.release_date}</li>
                <li>
                  Puntuación:{" "}
                  <span>{movie?.vote_average?.toFixed(1) ?? "N/A"}</span> / 10
                </li>
                <li>País de origen: {movie.origin_country}</li>
                <li>
                  Género: {movie.genres.map((genre) => genre.name).join(", ")}
                </li>
                <li>
                  Duración: <strong>{movie.runtime}</strong> minutes
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MovieDetail;
