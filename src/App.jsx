import "./App.css";
import Movies from "./pages/Movie";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link } from "react-router";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Pagination from "./pages/Pagination";

function App() {
  const [films, setFilms] = useState([]);

  const apikey = "1f6c05af9a052262cc5f79b5bbfe674b";

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&sort_by=popularity.desc&page=1`
      )
      .then((response) => {
        setFilms(response.data.results);
      });
  }, []);

  return (
    <>
      <section className="hero">
        <header>
          <ul>
            <li>
              <Link to="/">Paranot</Link>
            </li>

            <div className="nav-links">
              <li>
                <Link to="/buscar">Buscar</Link>
              </li>

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
  <Link to="/paginacion">Paginación</Link>
</li>
            </div>
          </ul>
        </header>
        <div className="hero-text">
          <h1>Tus películas y series favoritas están aquí</h1>
          <h2>
            Paranot es una página para organizar y guardar tus peliculas y
            series favoritas
          </h2>
        </div>
      </section>

      <main>
        <Routes>
          <Route path="/" element={<Movies movies={films} />} />

          <Route path="/moviedetail/:idMovie" element={<MovieDetail />} />

          <Route path="/buscar" element={<Search />} />

          <Route path="/paginacion" element={<Pagination />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer>
        <div className="footer-text">
          <ul>
            <li> Paranot</li>
            <li>Creado por : Sebastian Camargo</li>
            <li>Todos los derechos reservados &copy; 2025</li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default App;
