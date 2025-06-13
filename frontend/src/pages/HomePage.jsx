import React from "react";
import Navbar from "../assets/components/reusable/navbar";
import HeroSection from "../assets/components/homepage/HeroSection";
import AboutSection from "../assets/components/homepage/AboutSection";
import Features from "../assets/components/homepage/Features";
import KhatmahSlider from "../assets/components/homepage/KhatmahSliderSection";
import ContactUs from "../assets/components/homepage/ContactSection";
import { FaChevronUp } from "react-icons/fa";
function HomePage() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <Features />
      <KhatmahSlider />
      <ContactUs />
      <ButtonUp />
    </div>
  );
}

function ButtonUp() {
  return (
    <button
      className="nav-button up"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <FaChevronUp />
    </button>
  );
}

export default HomePage;
