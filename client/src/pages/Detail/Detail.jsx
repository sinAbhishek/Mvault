import axios from "axios";
import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Modaltwo from "../Modal/Modal";
import Navbar from "../Navbar/Navbar";
import "./detail.css";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { AuthContext } from "../../Context/AuthContext";
import "default-passive-events";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Detail = () => {
  const [link, setlink] = useState("");
  const [data, setdata] = useState([]);
  const [result, setresult] = useState([]);
  const [isModal, setisModal] = useState(false);
  const [detail, setdetail] = useState("");
  const [duration, setduration] = useState("");
  const [cast, setcast] = useState("");
  const [slicedcast, setslicedcast] = useState("");
  const [reviews, setreviews] = useState("");
  const [isadded, setisadded] = useState(true);
  const [watchlist, setwatchlist] = useState("");
  const navigate = useNavigate();
  const { search, dispatch, user } = useContext(AuthContext);
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [trigger, settrigger] = useState(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const URL = process.env.REACT_APP_Url;
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`${URL}/Auth/${user._id}`);
      setwatchlist(res.data.watchlist);
    };
    user && call();
  }, [user, trigger]);
  useEffect(() => {
    const call = () => {
      setisadded(watchlist.some((cr) => cr.id === location.state.id));
    };
    watchlist && call();
  }, [watchlist]);
  useEffect(() => {
    setlink(location.state.media_type);
  }, []);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${link}/${location.state.id}?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US`
      );
      setdetail(res.data);
    };
    link && call();
  }, [data]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${link}/${location.state.id}?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&append_to_response=videos`
      );
      setdata(res.data.videos.results);
    };
    link && call();
  }, [link]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${link}/${location.state.id}/credits?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US`
      );
      setcast(res.data);
    };
    link && call();
  }, [link]);
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
  useEffect(() => {
    const filter = () => {
      const res = data.filter((cr) => cr.site === "YouTube");
      setresult(res);
    };
    data[0] && filter();
  }, [data]);
  useEffect(() => {
    const filter = () => {
      if (cast.cast.length > 25) {
        setslicedcast(cast.cast.slice(0, 25));
      } else {
        setslicedcast(cast.cast);
      }
    };
    cast && filter();
  }, [cast]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${link}/${location.state.id}/reviews?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US&page=1`
      );
      setreviews(res.data.results);
    };
    link && call();
  }, [link]);

  const addwatchlist = async (e) => {
    const res = await axios.post(`${URL}/Auth/${user._id}`, location.state);
    settrigger(!trigger);
    localStorage.setItem("trigger", !trigger);
  };

  const setmodal = () => {
    setisModal(true);
  };
  const closemodal = () => {
    setisModal(false);
    toast.success("Your review has been added", {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  return (
    <>
      <Navbar />
      <div
        className="back-cover"
        style={{
          backgroundImage: `linear-gradient(to top,rgba(0,0,0,1)10%,rgba(0,0,0,0)70%),url(https://image.tmdb.org/t/p/original/${location.state.backdrop_path})`,
        }}
      ></div>
      <div className="detail-container">
        <div className="detail-wrapper">
          <div className="details">
            <div className="head1">
              <h3 className="t1">
                {location.state.title || location.state.name}
              </h3>
            </div>
            <div className="img-d1">
              <div className="image">
                <img
                  className="img1"
                  src={`https://image.tmdb.org/t/p/original/${location.state.poster_path}`}
                  alt=""
                />
              </div>
              <div className="dsc">
                <div className="genre-wrap12">
                  {detail &&
                    detail.genres.map((cr) => (
                      <div className="genre-det">
                        <p className="det-p">{cr.name}</p>
                      </div>
                    ))}
                </div>

                {detail && link === "movie" && (
                  <div className="movie-detail">
                    <h3 className="overview-h1">
                      Aired:{" "}
                      <p className="overview-det2">{detail.release_date}</p>
                    </h3>
                    <h3 className="overview-h1">
                      Duration: <p className="overview-det2"> {duration}</p>
                    </h3>
                    <div className="rating">
                      <h4 className="overview-h1">Rating: </h4>
                      <StarIcon sx={{ color: "#f2cb05" }} />
                      <span className="overview-det2">
                        {detail.vote_average - Math.floor(detail.vote_average) <
                        0.5
                          ? Math.floor(detail.vote_average)
                          : Math.ceil(detail.vote_average)}
                        /10
                      </span>
                    </div>
                  </div>
                )}
                {detail && link === "tv" && (
                  <div className="tv-detail">
                    <h3 className="overview-h1">
                      Aired:{" "}
                      <p className="overview-det2">
                        {detail.first_air_date} / {detail.last_air_date}
                      </p>
                    </h3>
                    <h3>
                      Duration:{" "}
                      <p className="overview-det2">
                        {detail.episode_run_time[0]}m
                      </p>
                    </h3>
                    <div className="rating">
                      <h4 className="overview-h1">Rating: </h4>
                      <StarIcon sx={{ color: "#f2cb05" }} />
                      <span className="overview-det2">
                        {" "}
                        {detail.vote_average - Math.floor(detail.vote_average) <
                        0.5
                          ? Math.floor(detail.vote_average)
                          : Math.ceil(detail.vote_average)}
                        /10
                      </span>
                    </div>
                  </div>
                )}

                <div className="det-buttons def-display">
                  <Button className="trailer-btn" onClick={handleOpen}>
                    <PlayCircleOutlineIcon />
                    Trailer and clips
                  </Button>
                  <button
                    disabled={isadded}
                    className="btn-det"
                    onClick={addwatchlist}
                  >
                    <div className="in">
                      <AddIcon /> <p>ADD TO WATCHLIST</p>
                    </div>
                  </button>
                  <button
                    disabled={user ? false : true}
                    className="btnReview"
                    onClick={setmodal}
                  >
                    ADD REVIEW
                  </button>
                </div>
              </div>
            </div>
            <div className="displa">
              <p className="overview-det">{location.state.overview}</p>
            </div>

            <div className="det-buttons display">
              <Button className="trailer-btn" onClick={handleOpen}>
                <PlayCircleOutlineIcon />
                Trailer and clips
              </Button>
              <button
                disabled={isadded}
                className="btn-det"
                onClick={addwatchlist}
              >
                <div className="in">
                  <AddIcon /> <p>ADD TO WATCHLIST</p>
                </div>
              </button>
              <button
                disabled={user ? false : true}
                className="btnReview"
                onClick={setmodal}
              >
                ADD REVIEW{" "}
              </button>
            </div>
          </div>

          <div className="modalcon">
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style} className="modal-mui">
                <div className="trandclip">
                  <Swiper
                    grabCursor={true}
                    spaceBetween={10}
                    navigation={true}
                    modules={[Navigation]}
                    className="mySwiper"
                  >
                    {result &&
                      result.map((cr, i) => (
                        <SwiperSlide key={i}>
                          <div className="tandclip">
                            <iframe
                              className="iframe"
                              width="100%"
                              height="100%"
                              allowFullScreen={true}
                              src={`https://www.youtube-nocookie.com/embed/${cr.key}`}
                            ></iframe>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </Box>
            </Modal>
          </div>

          <div className="postReview">
            {isModal && (
              <Modaltwo
                close={closemodal}
                movieid={location.state.id}
                rating={Math.round(location.state.vote_average)}
              />
            )}
          </div>
          <div className="castandcrew">
            <NavLink
              to={{ pathname: "/cast" }}
              state={{ id: location.state.id, type: link }}
            >
              <div className="subTitle">
                <h3 className="det-subhead">Cast&Crew</h3>
              </div>
            </NavLink>

            <div className="castwrapper">
              {slicedcast &&
                slicedcast.map((cr, i) => (
                  <div className="castdet">
                    <img
                      className="castimg"
                      src={
                        cr.profile_path
                          ? `https://image.tmdb.org/t/p/original/${cr.profile_path}`
                          : "/def-person.jpg"
                      }
                      alt=""
                    />
                    <h5>{cr.name}</h5>
                    <p className="cast-char">{cr.character}</p>
                  </div>
                ))}
            </div>
            <div className="reviews">
              <NavLink
                to={{ pathname: "/review" }}
                state={{ id: location.state.id, type: link }}
              >
                <div className="subTitle">
                  <h3 className="det-subhead">Reviews</h3>
                </div>
              </NavLink>
              {reviews &&
                reviews.map((cr, i) => (
                  <div className="review-cont">
                    <div className="author-det">
                      <img
                        className="author-img"
                        src={`https://image.tmdb.org/t/p/original/${cr.author_details.avatar_path}`}
                        alt=""
                      />
                      <h4>{cr.author}</h4>
                    </div>
                    <div className="author-msg">
                      <p className="overview-det">{cr.content}</p>
                    </div>
                    <hr />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};
export default Detail;
