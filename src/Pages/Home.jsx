import React from "react";
import "./Home.css";
import heroImg from "../assets/hero.jpg";

function Home() {
  return (
    <div className="home-container">
      <img
        src={heroImg}
        className="hero-img"
        alt="CoffeeHouse hero"
      />

      <div className="hero-overlay" />

      <div className="hero-text">
        <h1>Welcome to CoffeeHouse</h1>
        <p>Your daily dose of handcrafted coffee.</p>
      </div>
    </div>
  );
}

export default Home;
