import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import "./cast.css";
import Navbar from "../Navbar/Navbar";
const Cast = () => {
  const [cast, setcast] = useState("");
  const location = useLocation();

  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${location.state.type}/${location.state.id}/credits?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US`
      );
      setcast(res.data);
    };
    call();
  }, []);

  return (
    <>
      <Navbar />
      <div className="castcrew">
        <h4 className="cast-tit">Cast</h4>
        <div className="cast-wrap">
          {cast &&
            cast.cast.map((cr, i) => (
              <div className="cast-main">
                <img
                  className="castcrew-img"
                  src={
                    cr.profile_path
                      ? `https://image.tmdb.org/t/p/original/${cr.profile_path}`
                      : "/def-person.jpg"
                  }
                  alt=""
                />
                <div className="char-det">
                  <h5>{cr.name}</h5>
                  <p>{cr.character}</p>
                </div>
              </div>
            ))}
        </div>

        <h4 className="crew-tit">Crew</h4>
        <div className="crew-wrap">
          {cast &&
            cast.crew.map((cr, i) => (
              <div className="cast-main">
                <img
                  className="castcrew-img"
                  src={
                    cr.profile_path
                      ? `https://image.tmdb.org/t/p/original/${cr.profile_path}`
                      : "/def-person.jpg"
                  }
                  alt=""
                />
                <div className="char-det">
                  <h5>{cr.name}</h5>
                  <p>{cr.job}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Cast;
