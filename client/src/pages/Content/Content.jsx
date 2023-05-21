import React from "react";
import "./content.css";
const Content = ({ prop }) => {
  return (
    <div>
      <div className="review-cont">
        <div className="author-det">
          <img
            className="author-img"
            src={prop.author_details?`https://image.tmdb.org/t/p/original/${prop.author_details.avatar_path}`: "/def-person.jpg"}
            alt=""
          />
          <h4>{prop.author}</h4>
        </div>
        <div className="author-msg">
          <p className="overview-det">{prop.content}</p>
        </div>
        <hr />
      </div>
    </div>
  );
};

export default Content;
