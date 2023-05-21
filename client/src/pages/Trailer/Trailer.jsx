import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./trailer.css";
import StarIcon from "@mui/icons-material/Star";
const Trailer = ({ trailerDetail }) => {
  const [data, setdata] = useState([]);
  const [result, setresult] = useState([]);
  const [detail, setdetail] = useState("");
  const [duration, setduration] = useState("");
  const [movie, setmovie] = useState("");

  useEffect(() => {
    trailerDetail && setmovie(trailerDetail);
  }, []);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${movie.media_type}/${movie.id}?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&append_to_response=videos`
      );
      setdata(res.data.videos.results);
    };
    movie && call();
  }, [movie]);
  useEffect(() => {
    const filter = async () => {
      const res = await data.filter((cr) => cr.type === "Trailer");
      setresult(res);
    };
    data && filter();
  }, [data]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${movie.media_type}/${movie.id}?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US`
      );
      setdetail(res.data);
    };
    movie && call();
  }, [data]);
  useEffect(() => {
    const call = () => {
      if (detail.runtime > 60) {
        const hr = Math.floor(detail.runtime / 60);
        const min = detail.runtime % 60;
        setduration(hr + "hr" + min + "min");
      } else {
        setduration(detail.runtime + "min");
      }
    };

    detail && call();
  }, [detail]);

  return (
    <div className="trailer-wrapper">
      <div className="trailer-cont">
        <div className="trailer-video">
          {result[0] ? (
            <iframe
              className="iframe"
              allowFullScreen={true}
              src={`https://www.youtube-nocookie.com/embed/${result[0].key}`}
            ></iframe>
          ) : (
            "noyhing"
          )}
        </div>
      </div>
      <div className="trailer-desc">
        <div className="cont12">
          <div className="img-cont12">
            {movie && (
              <img
                className="trailer-img"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
              />
            )}
          </div>

          <div className="desktop-title">
            {movie && <h4 className="title12">{movie.title || movie.name}</h4>}
            <div className="genre-wrap">
              {detail &&
                detail.genres.map((cr) => (
                  <div className="genre">
                    <p className="p12">{cr.name}</p>
                  </div>
                ))}
            </div>
            {duration && movie.media_type === "movie" ? (
              <div className="movie-detail">
                <h3 className="trSubtitle">
                  Aired:{" "}
                  <span className="trContent">{detail.release_date}</span>
                </h3>
                <h3 className="trSubtitle">
                  Duration: <span className="trContent">{duration}</span>
                </h3>
                <div className="rating">
                  <h3 className="trSubtitle">Rating: </h3>
                  <StarIcon />
                  <span>{Math.floor(detail.vote_average)}/10</span>
                </div>
              </div>
            ) : (
              <div className="tv-detail">
                <h3 className="trSubtitle">
                  Aired:{" "}
                  <span className="trContent">
                    {detail.first_air_date} / {detail.last_air_date}
                  </span>
                </h3>
                <h3 className="trSubtitle">
                  Duration: <span className="trContent">{detail.runtime}</span>
                </h3>
                <div className="rating">
                  <h3 className="trSubtitle">Rating: </h3>
                  <StarIcon />
                  <span className="trContent">
                    {detail.vote_average - Math.floor(detail.vote_average) < 0.5
                      ? Math.floor(detail.vote_average)
                      : Math.ceil(detail.vote_average)}
                    /10
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        {movie && (
          <div className="title-des12">
            <div className="genre-wrap desktop">
              <p className="overviewTxt">{movie.overview}</p>
            </div>
            <div className="non-desktop">
              <h4 className="title12">{movie.title || movie.name}</h4>
              {/* <p className='overview12'>{movie.overview}</p> */}
              <div className="genre-wrap">
                {detail &&
                  detail.genres.map((cr) => (
                    <div className="genre">
                      <p className="p12">{cr.name}</p>
                    </div>
                  ))}
              </div>
            </div>

            {duration && movie.media_type === "movie" ? (
              <div className="movie-detail non-desktop">
                <h3 className="trSubtitle">
                  Aired:{" "}
                  <span className="trContent">{detail.release_date}</span>
                </h3>
                <h3 className="trSubtitle">
                  Duration: <span className="trContent">{duration}</span>
                </h3>
                <div className="rating">
                  <h3 className="trSubtitle">Rating: </h3>
                  <StarIcon />
                  <span className="trContent">
                    {Math.floor(detail.vote_average)}/10
                  </span>
                </div>
                <div className="home-titlecont">
                  <p className="overviewTxt">{movie.overview}</p>
                </div>
              </div>
            ) : (
              <div className="tv-detail non-desktop">
                <h3 className="trSubtitle">
                  Aired:{" "}
                  <span className="trContent">
                    {detail.first_air_date} / {detail.last_air_date}
                  </span>
                </h3>
                <h3 className="trSubtitle">
                  Duration: <span className="trContent">{detail.runtime}</span>
                </h3>
                <div className="rating">
                  <h3 className="trSubtitle">Rating: </h3>
                  <StarIcon />
                  <span className="trContent">
                    {detail.vote_average - Math.floor(detail.vote_average) < 0.5
                      ? Math.floor(detail.vote_average)
                      : Math.ceil(detail.vote_average)}
                    /10
                  </span>
                </div>
                <div className="home-titlecont">
                  <p className="overviewTxt">{movie.overview}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Trailer;
