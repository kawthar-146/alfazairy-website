import React, { Fragment } from "react";
import Hero from "../components/hero/hero";
import Features from "../components/features/features";
import Coverdress from "../components/coverdress/coverdress";


const Home = () => {
  return (
    <Fragment>
      <Hero />
      <Features />
      <Coverdress />
    </Fragment>
  );
};

export default Home;
