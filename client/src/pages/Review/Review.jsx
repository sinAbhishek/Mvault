import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import "./review.css";
import Content from "../Content/Content";
const Review = () => {
  const location = useLocation();
  const [movieid, setmovieid] = useState();
  const [media_type, setmedia_type] = useState();
  const [data, setdata] = useState();
  const [pageno, setpageno] = useState();
  const [pages, setpages] = useState();
  const [activepage, setactivepage] = useState("1");
  const [dbreview, setdbreview] = useState();
  const [results, setresults] = useState();
  const URL = process.env.REACT_APP_Url;
  useEffect(() => {
    setmedia_type(location.state.type);
    setmovieid(location.state.id);
  }, [location.state]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${movieid}/reviews?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US&page=${activepage}`
      );
      setdata(res.data.results);
      setpageno(res.data.total_pages);
    };
    movieid && call();
  }, [movieid]);
  useEffect(() => {
    const call = async () => {
      try {
        const ownreview = await axios.get(`${URL}/Review/${movieid}`);
        setdbreview(ownreview.data);
      } catch (err) {
        console.log(err);
      }
    };
    data && call();
  }, [data]);
  useEffect(() => {
    const call = async () => {
      setresults([...data, ...dbreview]);
    };
    dbreview && call();
  }, [dbreview]);
  useEffect(() => {
    const setpagess = () => {
      const array = [];
      let i = 0;
      while (i < pageno) {
        i += 1;
        array.push(i);
      }

      setpages(array);
    };
    setpagess();
  }, [pageno]);

  return (
    <div>
      <h4 className="revTitle">Reviews </h4>

      {results
        ? results.map((cr) => (
            <div className="review">
              <Content prop={cr} />
            </div>
          ))
        : "nothing"}
    </div>
  );
};

export default Review;
