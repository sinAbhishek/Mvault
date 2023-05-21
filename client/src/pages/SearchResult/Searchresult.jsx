import React, { useEffect, useState, useContext } from "react";

import axios from "axios";
import Popular from "../popular/Popular";
import "./Searchresult.css";
import { useLocation, useNavigate } from "react-router";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../Context/AuthContext";
const Searchresult = () => {
  const [Search, setsearch] = useState("");
  const [pageno, setpageno] = useState();
  const [pages, setpages] = useState();
  const [data, setdata] = useState([]);
  const [activepage, setactivepage] = useState(1);
  const location = useLocation();
  const { search, dispatch } = useContext(AuthContext);
  useEffect(() => {
    setsearch(location.state);
  }, [search]);

  const handle = (e) => {
    setsearch((prev) => e.target.value);
  };

  useEffect(() => {
    const update = async () => {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US&query=${search}&page=${activepage}&include_adult=false`
      );
      console.log(res);
      setpageno(res.data.total_pages);
      console.log(res.data.total_pages);
      setdata(res.data.results);
    };
    update();
  }, [activepage, search]);
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

  const test = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=a58418d9bc8171cf184dfa8a5ce03ca0&language=en-US&query=${search}&page=${activepage}&include_adult=false`
    );

    setpageno(res.data.total_pages);
    console.log(res.data.total_pages);
    setdata(res.data.results);
    setsearch("");
  };

  const changepage = (cr) => {
    setactivepage(cr);
  };
  return (
    <div>
      <Navbar />
      <div className="containe">
        {data.map((cr) => (
          <Popular movie={cr} />
        ))}
      </div>

      <div className="fdf">
        {pages ? (
          <div className="page-cot">
            {pages.map((cr) => (
              <div onClick={() => changepage(cr)} className="pageno-">
                <h1>{cr}</h1>
              </div>
            ))}
          </div>
        ) : (
          "nothing"
        )}
      </div>
    </div>
  );
};

export default Searchresult;
