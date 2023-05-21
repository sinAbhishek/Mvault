import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Popular from "../popular/Popular";
import axios from "axios";
import "./tvshow.css";
const TvShow = () => {
  const [Tvshow, setTvshow] = useState([]);
  const [pages, setpages] = useState();
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/tv/popular?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US&page=1"
      );
      setTvshow(res.data.results);
      setpages(res.data.total_pages);
    };
    call();
  }, []);
  const call = () => {
    console.log(pages);
  };
  return (
    <div>
      <Navbar />
      <div className="tvshow">
        {Tvshow.map((cr) => (
          <Popular data={{ ...cr, media_type: "tv", pages }} />
        ))}
      </div>
      <button onClick={call}>Test</button>
    </div>
  );
};

export default TvShow;
