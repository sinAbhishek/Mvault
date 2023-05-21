import React, { useEffect, useState } from "react";
import axios from "axios";

const Watchlist = () => {
  const [watchlist, setwatchlist] = useState([]);
  useEffect(() => {
    const call = async () => {
      const res = await axios.get("/Auth/640099405ca8fca135e05622");
      setwatchlist(res.data.watchlist);
    };
    call();
  }, [watchlist]);

  return (
    <div>
      Watchlist
      {watchlist[0]
        ? watchlist.map((cr) => (
            <div className="watchlist">
              <p>{cr.name}</p>
            </div>
          ))
        : "loading"}
    </div>
  );
};

export default Watchlist;
