import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import "./card.css";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
const Card = () => {
  const [category, setcategory] = useState("");
  const [type, settype] = useState("");
  const [data, setdata] = useState("");
  const [page, setpage] = useState(JSON.parse(localStorage.getItem("page")));
  const [test, settest] = useState(JSON.parse(localStorage.getItem("page")));
  const [pageNo, setpageNo] = useState(1);
  const location = useLocation();

  const increase = () => {
    setpage(page + 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  useEffect(() => {
    localStorage.setItem("page", JSON.stringify(page));
    setpageNo(JSON.parse(localStorage.getItem("page")));
  }, [page]);

  const decrease = () => {
    page != 1 && setpage(page - 1);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    setcategory(location.state.category);
  }, [location.state.search]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${category}/all/day?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&page=${pageNo}`
      );
      setdata(res.data.results);
    };
    category === "trending" && call();
  }, [category, pageNo]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${location.state.type}/${category}?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US&page=${pageNo}`
      );
      setdata(res.data.results);
    };
    category === "popular" && call();
  }, [category, pageNo, location.state.type]);

  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.id}/${category}?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US&page=${pageNo}`
      );
      setdata(res.data.results);
    };
    category === "similiar" && call();
  }, [category, pageNo]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.id}/${category}?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US&page=${pageNo}`
      );
      setdata(res.data.results);
    };
    category === "recommendations" && call();
  }, [category, pageNo]);
  useEffect(() => {
    const update = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US&query=${location.state.search}&page=${pageNo}&include_adult=false`
      );
      setdata(res.data.results);
    };

    location.state.search && category === "search" && update();
  }, [category, pageNo, location.state.search]);

  return (
    <>
      <Navbar />
      <div className="card">
        {data[0] ? (
          <div className="card-container">
            {data &&
              data.map((cr, i) => (
                <div className="cardwrapper">
                  <NavLink
                    to={{ pathname: "/detail" }}
                    state={
                      category === "popular"
                        ? { ...cr, media_type: location.state.type }
                        : cr
                    }
                  >
                  
                    <div
                      style={{
                        backgroundImage:cr.poster_path === null&&cr.backdrop_path===null?"url(/loginBg.jpg)":cr.poster_path === null?`url(https://image.tmdb.org/t/p/w500/${cr.backdrop_path})`:`url(https://image.tmdb.org/t/p/w500/${cr.poster_path})`   
                      }}
                      className="card-img"
                    ></div>
                    <h3 className="cardtitle">{cr.title || cr.name}</h3>
                  </NavLink>
                </div>
              ))}
          </div>
        ) : (
          <div className="Noresult">No results found</div>
        )}
        {data[0] && (
          <div className="pageswitch">
            <ArrowCircleLeftIcon
              disabled={true}
              onClick={() => decrease()}
              className={page === 1 ? "left-btn disable" : "left-btn"}
            />
            <ArrowCircleRightIcon
              onClick={() => increase()}
              className="right-btn"
            />
          </div>
        )}
      </div>
    </>
  );
};

export const MemoCard = React.memo(Card);
