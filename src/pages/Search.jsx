import { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";

function Search() {
  const [moviesSeach, setMoviesSeach] = useState([]);
  const [searchImput, setSearchImput] = useState("");

  useEffect(() => {
    if (searchImput === "") {
      setMoviesSeach([]);
      return;
    }

    const apikey = "1f6c05af9a052262cc5f79b5bbfe674b";

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${searchImput}`
      )
      .then((response) => {
        setMoviesSeach(response.data.results);
      });
  }, [searchImput]);

  return (
    <>
      <div className="search">
        <h1>Buscar película por título</h1>
        <form>
          <input
            type="text"
            value={searchImput}
            onInput={(event) => setSearchImput(event.target.value)}
          />
        </form>
        <div>
          {searchImput && moviesSeach.length === 0 ? (
            <h1 className="no-movies">
              Lo sentimos, no se encontraron películas con ese título.
            </h1>
          ) : (
            <ul>
              {moviesSeach.map((movie) => {
                return <li key={movie.id}>{movie.title}</li>;
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
