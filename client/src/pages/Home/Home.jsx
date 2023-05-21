import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Popular from "../popular/Popular";
import "./home.css";
import { useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import Trending from "../Trending/Trending";
import { DarkTheme } from "../../App";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Swiper, SwiperSlide } from "swiper/react";
import HashLoader from "react-spinners/ScaleLoader";
import "swiper/css";
import "swiper/css/bundle";
import { NavLink } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Home = () => {
  const { change } = useContext(DarkTheme);
  const [trending, settrending] = useState([]);
  const [Loading, setloading] = useState(true);
  const [popular, setpopular] = useState([]);
  const [search, setsearch] = useState("");
  const [pageno, setpageno] = useState();
  const [pages, setpages] = useState();
  const [data, setdata] = useState([]);
  const [activepage, setactivepage] = useState(1);
  const [type, settype] = useState("movie");

  const navigate = useNavigate();
  const URL = process.env.REACT_APP_Url;
  useEffect(() => {
    localStorage.setItem("page", 1);
  }, []);
  useEffect(() => {
    setloading(false);
  }, [trending, popular]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        "https://api.themoviedb.org/3/trending/all/day?api_key=a58418d9bc8171cf184dfa8a5ce03ca0"
      );
      settrending(res.data.results);
    };
    call();
  }, []);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${type}/popular?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US&page=1`
      );
      setpopular(res.data.results);
    };
    call();
  }, [type]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`${URL}/Auth/640099405ca8fca135e05622`);
      console.log(res.data);
    };

    call();
  });
  return (
    <>
      <Navbar />
      {Loading && (
        <div className="homeloader">
          <HashLoader
            color={"red"}
            loading={Loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      <div className="home-Container">
        <div className="main">
          <div className="TrendingContainer">
            <NavLink
              className="navlink"
              to="/card"
              state={{ category: "trending" }}
            >
              <div className="mainTitle">
                <h4 className="TrName">Trending </h4>
                <ArrowForwardIosIcon />
              </div>
            </NavLink>
            <Trending movie={trending} />
          </div>
        </div>
        <div className="PopularContainer">
          <div className="Popular-title">
            <NavLink
              className="navlink"
              to="/card"
              state={{ category: "popular", type: type }}
            >
              <div className="mainTitle">
                <h2 className="TrName">Popular</h2>
                <ArrowForwardIosIcon />
              </div>
            </NavLink>

            <div className="btn-pop">
              <div
                className={type === "movie" ? "act def movie" : "def movie"}
                onClick={() => settype("movie")}
              >
                <h5>Movie</h5>
              </div>
              <div
                className={type === "tv" ? "act def tv" : "def tv"}
                onClick={() => settype("tv")}
              >
                <h5>Tv</h5>
              </div>
            </div>

            <div className="slider-t">
              <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={"auto"}
              >
                {popular &&
                  popular.map((cr, i) => (
                    <SwiperSlide key={i}>
                      <Popular data={{ ...cr, media_type: type }} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
