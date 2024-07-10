import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-full">
          <h1 className="mb-6 text-5xl font-bold ">Renaissance Macros</h1>
          <p className="mb-7 max-w-md">
            Achieve your weight goals with our smart algorithms that creates
            personalized meal plans based on your body, lifestyle, and
            objectives. Make informed food choices, track progress, and
            transform your nutrition effortlessly.
          </p>
          <Link
            to="/signup"
            className="btn bg-btnPrimary border-none text-slate-300"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
