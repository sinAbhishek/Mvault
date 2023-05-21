import React, { useContext, useEffect } from "react";
import "./navbar.css";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { NavLink } from "react-router-dom";
import { DarkTheme } from "../../App";
import SearchIcon from "@mui/icons-material/Search";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import axios from "axios";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Drawer from "@mui/material/Drawer";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Navbar = () => {
  const { search, dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [Search, setsearch] = useState("");
  const { change } = useContext(DarkTheme);
  const [open, setOpen] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [watchlist, setwatchlist] = useState("");
  const [data, setdata] = useState([]);
  const [trigger, settrigger] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setisopen(false);
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };
  const URL = process.env.REACT_APP_Url;
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
  const handle = (e) => {
    setsearch((prev) => e.target.value);
  };
  const test = async () => {
    Search &&
      navigate("/card", { state: { category: "search", search: Search } });
  };
  const handleClick = () => {
    setisopen(!isopen);
  };
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(`${URL}/Auth/${user._id}`);
      setwatchlist(res.data.watchlist);
    };
    call();
  }, [isopen, trigger]);
  const test2 = () => {
    setOpen(!open);
  };

  const remove = async (cr) => {
    console.log("removed");
    const res = await axios.put(`${URL}/Auth/${user._id}`, { movieid: cr.id });
    settrigger(!trigger);
  };

  return (
    <div className="navbar">
      <div className={open ? "drawer-left showdraw" : "drawer-left"}>
        <div className="closeDrawer">
          <MenuOpenIcon sx={{ fontSize: "2rem" }} onClick={test2} />
        </div>
        <div className="drawer-menu">
          <div className="drawer-items">
            <NavLink
              className="category-cont"
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "red" : "white",
                textDecoration: !isActive ? "none" : "underline",
              })}
            >
              <span className="drawer-item">Home</span>
            </NavLink>
          </div>
          <div className="drawer-items">
            <NavLink
              className="category-cont"
              to="/card"
              state={{ category: "popular", type: "tv" }}
          
            >
              <span className="drawer-item">TvShow</span>
            </NavLink>
          </div>
          <div className="drawer-items">
            <NavLink
              className="category-cont"
              to="/card"
              state={{ category: "popular", type: "movie" }}
            
            >
              <span className="drawer-item">Movie</span>
            </NavLink>
          </div>
          <hr />
          <div className="drawer-items">
            <div onClick={() => handleClick()} className="nav-btn">
              <BookmarkIcon sx={{ color: "#e0104b" }} />
              Watchlist
            </div>
          </div>
          <div className="drawer-items"></div>
        </div>
      </div>
      <div className="nav-wrapper">
        <div className="leftside">
          <div className="ham-btn">
            <button onClick={() => test2()}>
              <MenuIcon />
            </button>
          </div>

          <div className="left-menu mSize">
            <NavLink
              className="category-cont"
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "black" : "white",
                textDecoration: !isActive ? "none" : "underline",
              })}
            >
              <span className="Category">Home</span>
            </NavLink>
            <NavLink
              className="category-cont"
              to="/card"
              state={{ category: "popular", type: "tv" }}
            >
              <span className="Category">TvShow</span>
            </NavLink>
            <NavLink
              className="category-cont"
              to="/card"
              state={{ category: "popular", type: "movie" }}
            >
              <span className="Category">Movie</span>
            </NavLink>
          </div>
        </div>
        <div className="center">
          <div className="search">
            <input
              className="search-input"
              onChange={handle}
              type="text"
              placeholder="Search Movies,TVshows"
              value={Search}
              name=""
              id=""
            />

            <div onClick={() => test()} className="search-btn">
              <SearchIcon sx={{ color: "red" }} />
            </div>
          </div>
        </div>
        <div className="rightside">
          <Modal
            open={isopen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style} className="WatchlistModal">
              {watchlist[0] ? (
                <div className="watchlist-wrapper">
                  <div className="watchlist">
                    {watchlist &&
                      watchlist.map((cr, i) => (
                        <div className="watchlist-cont">
                          <div className="watchlist-content">
                            <div className="wlDet">
                              <img
                                className="watchlist-img"
                                src={`https://image.tmdb.org/t/p/original/${cr.poster_path}`}
                                alt=""
                              />
                              <h3>{cr.title || cr.name}</h3>
                            </div>

                            <div className="delBtn" onClick={() => remove(cr)}>
                              Remove
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                <div className="noWatchlist">Nothing Here</div>
              )}
            </Box>
          </Modal>
          <div className="hideRyt">
            <button onClick={() => handleClick()} className="nav-btn1">
              <BookmarkIcon />
              Watchlist
            </button>
          </div>

          <div className="profile">
            {user ? (
              <>
                <p>{user.username}</p>
                <div className="logout" onClick={logout}>
                  <LogoutIcon />
                </div>
              </>
            ) : (
              <button className="nav-btn2">
                <a href="/login">SignIn</a>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
