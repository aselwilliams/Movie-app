import { useState, useEffect } from "react";
import "./App.css";
import Movie from "./components/Movie";

const featured_api =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const img_api = "https://image.tmdb.org/t/p/w1280";
const search_api =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getMovies = (api) => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };
  useEffect(() => {
    getMovies(featured_api);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(search_api + searchTerm);
      setSearchTerm("");
    }
  };
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="search"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search..."
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.map((movie) => (
          <Movie key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

export default App;
