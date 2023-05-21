import React, { useEffect, useState } from "react";
import Popular from "../popular/Popular";
import Trailer from "../Trailer/Trailer";
import "./trending.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";

export const Trending = ({ movie }) => {
  const [activeTrailer, setactiveTrailer] = useState("");
  const [trendItem, settrendItem] = useState("");
  useEffect(() => {
    const call = () => {
      const length = movie.length;
      const randomno = Math.floor(Math.random() * length);
      setactiveTrailer(movie[randomno]);
    };
    movie && call();
  }, [movie]);
  useEffect(() => {
    const call = () => {
      settrendItem(movie.filter((cr) => cr.id !== activeTrailer.id));
    };
    activeTrailer && call();
  }, [activeTrailer]);

  return (
    <div className="Trending">
      <div className="trailer">
        {activeTrailer && <Trailer trailerDetail={activeTrailer} />}
      </div>

      <div className="slider">
        <Swiper grabCursor={true} spaceBetween={10} slidesPerView={"auto"}>
          {trendItem &&
            trendItem.map((cr, i) => (
              <SwiperSlide key={i}>
                <Popular data={cr} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Trending;
