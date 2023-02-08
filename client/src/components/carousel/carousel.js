import React, { Fragment, useEffect, useState } from "react";

const Carousel = () => {
  // const [data, setData] = useState(null);
  let data = null;
  useEffect(() => {
    fetch("http://localhost:8000/api/dresses/featured")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        data = json.dresses;
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      }, []);
  });

  return (
    <Fragment>
      {data && (
        <div>
          {data.forEach((item) => {
            <img src={require(item.image)} />;
          })}
        </div>
      )}
    </Fragment>
  );
};

export default Carousel;
