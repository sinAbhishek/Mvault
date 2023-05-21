import React, { useEffect, useState } from "react";
import "./Popular.css";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Popular = ({ data }) => {
  const navigate = useNavigate();
  const handle = (data) => {
    navigate("/detail", { state: data });
  };

  return (
    <>
      <NavLink to={{ pathname: "/detail" }} state={data}>
        <div
          className="cont"
          style={{
            backgroundImage:
              data.poster_path === null
                ? `url(https://image.tmdb.org/t/p/w500/${data.backdrop_path})`
                : `url(https://image.tmdb.org/t/p/w500/${data.poster_path})`,
          }}
        ></div>

        {data.title ? (
          <p className="pos-12">{data.title}</p>
        ) : (
          <p className="pos-12">{data.name}</p>
        )}
      </NavLink>
    </>
  );
};

export default Popular;
