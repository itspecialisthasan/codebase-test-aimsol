import React from "react";
import "./Home.scss";
import bannerbg from "../../assets/banner_bg.png";

function Home() {
  return (
    <>
      <section className="banner">
        <div className="banner__content">
          <div className="banner__content__text-wrapper">
            <h1>Welcome to our world</h1>
            <p>Buy & Sell</p>
          </div>
          <div className="banner__content__image">
            <img src={bannerbg} alt="" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
