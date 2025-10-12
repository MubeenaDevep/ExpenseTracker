import React from "react";
import { Link } from "react-router-dom";
import animationImage from "../assets/economist_3.jpg";
import BackToTop from "../components/BackToTop";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative w-full h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${animationImage})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-[#fdf6e3]/90"></div>

        {/* Content */}
        <div className="relative z-10 max-w-2xl text-center bg-[#f9f3e7]/95 p-10 rounded-2xl border border-[#c9b79c] shadow-lg">
          <h1 className="text-4xl font-serif mb-4 text-[#3b2f2f]">
            Track Your Expenses, Take Control of Your Finances
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            Welcome to your personal finance assistant. Add, edit, filter, and
            manage your daily expenses with ease — all in one place.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Whether you're budgeting monthly or analyzing spending patterns,
            we've got you covered.
          </p>
          <Link
            to="/add-expenses"
            className="px-6 py-3 rounded-lg bg-[#c9b79c] hover:bg-[#b8a27f] text-white font-semibold transition duration-300"
          >
            Get Started Now
          </Link>
        </div>
      </div>

      <BackToTop />
    </div>
  );
}

export default Home;
