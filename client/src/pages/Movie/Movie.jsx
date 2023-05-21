import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Popular from "../popular/Popular";
import axios from "axios";
import "./movie.css";
const Movie = () => {
  const [movie, setmovie] = useState([]);
  const [pageno, setpageno] = useState(1);
  const [totalpage, settotalpage] = useState(0);

  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US&page=${pageno}`
      );
      setmovie(res.data.results);
      settotalpage(res.data.total_pages);
    };
    call();
  }, [pageno]);

  const nextpage = () => {
    if (pageno <= totalpage) {
      setpageno(pageno + 1);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };
  const prevpage = () => {
    if (pageno !== 0) {
      setpageno(pageno - 1);
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  };
  return (
    <div className="movie-cont">
      <Navbar />
      <div className="movies">
        {movie[0] &&
          movie.map((cr) => <Popular data={{ ...cr, media_type: "movie" }} />)}
      </div>
      <button onClick={prevpage}>Previos</button>
      <button onClick={nextpage}>Next</button>
    </div>
  );
};
export default Movie;
