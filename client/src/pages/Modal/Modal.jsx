import axios from "axios";
import React, { useState } from "react";
import "./modal.css";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import CloseIcon from "@mui/icons-material/Close";
import ScaleLoader from "react-spinners/DotLoader";
const Modaltwo = (prop) => {
  const { user } = useContext(AuthContext);
  const [text, settext] = useState();
  const [rating, setrating] = useState(0);
  const [Rating, setRating] = useState();
  const [Loading, setloading] = useState(false);
  const star = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const URL = process.env.REACT_APP_Url;
  const handle = (e) => {
    settext(() => e.target.value);
  };
  const Addreview = async () => {
    setloading(true);
    const res = await axios.post(`${URL}/Review`, {
      userid: user._id,
      movieid: prop.movieid,
      Rating: rating,
      content: text,
    });
    setloading(false);
    prop.close();
  };

  const Star = ({ starid, onClick, onMouseEnter, onMouseLeave, rate }) => {
    let setfill = "";
    if (rate >= starid) {
      setfill = "icon-fill";
    } else {
      setfill = "icon-blank";
    }

    return (
      <div
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <svg
          width="30px"
          height="30px"
          viewBox="0 0 24 24"
          className={setfill}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7225 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.2305C12.2034 17.0316 11.7966 17.0316 11.4745 17.2305L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.2775 13.7483 7.1518 13.3614 6.86309 13.1166L3.3979 10.1778C2.71588 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z"
            stroke="#f5dd0b"
            stroke-width="2"
          />
        </svg>
      </div>
    );
  };

  // <svg width="800px" height="800px" viewBox="0 0 24 24" fill="red" xmlns="http://www.w3.org/2000/svg">
  // <path d="M11.0748 3.25583C11.4141 2.42845 12.5859 2.42845 12.9252 3.25583L14.6493 7.45955C14.793 7.80979 15.1221 8.04889 15.4995 8.07727L20.0303 8.41798C20.922 8.48504 21.2841 9.59942 20.6021 10.1778L17.1369 13.1166C16.8482 13.3614 16.7225 13.7483 16.8122 14.1161L17.8882 18.5304C18.1 19.3992 17.152 20.0879 16.3912 19.618L12.5255 17.2305C12.2034 17.0316 11.7966 17.0316 11.4745 17.2305L7.60881 19.618C6.84796 20.0879 5.90001 19.3992 6.1118 18.5304L7.18785 14.1161C7.2775 13.7483 7.1518 13.3614 6.86309 13.1166L3.3979 10.1778C2.71588 9.59942 3.07796 8.48504 3.96971 8.41798L8.50046 8.07727C8.87794 8.04889 9.20704 7.80979 9.35068 7.45955L11.0748 3.25583Z" stroke="red" stroke-width="2"/>
  // </svg>

  return (
    <>
      <div className="overflow">
        <div className="modal">
          <div className="closerevBtn" onClick={prop.close}>
            <CloseIcon />
          </div>
          <h1>Review</h1>
          <h4>
            Rating: <p>{rating}/10</p>
          </h4>
          <div className="starcontainer">
            {star.map((cr, i) => (
              <Star
                starid={cr}
                rate={Rating || rating}
                onClick={() => setrating(cr)}
                onMouseLeave={() => setRating(0)}
                onMouseEnter={() => setRating(cr)}
              />
            ))}
          </div>

          <textarea
            className="reviewtxt"
            onChange={(e) => handle(e)}
            type="text"
            placeholder="Write your review"
          />
          <button className="postbtn" onClick={Addreview}>
            Submit
          </button>
          <div className="reviewloader">
            <ScaleLoader
              color={"#db0d4b"}
              loading={Loading}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Modaltwo;
