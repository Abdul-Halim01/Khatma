import React, { useState, useEffect } from "react";
import "./styles/HeroSection.css";
import {
  Link as ScrollLink,
  Element,
  animateScroll as scroll,
} from "react-scroll";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleStartKhatmah = () => {
    console.log("Start a Khatmah button clicked!");
    // Add your navigation logic here
  };

  const handleJoinNow = () => {
    console.log("Join Now button clicked!");
    // Add your navigation logic here
  };

  return (
    <Element name="Hero">
      <section className={`hero-section ${isLoaded ? "loaded" : ""}`}>
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-headline">انضم إلى ختمة قرآن جماعية اليوم</h1>
            <p className="hero-subheading">
              شارك في التلاوة الجماعية، تابع تقدمك، وتواصل مع المسلمين حول
              العالم في رحلة جميلة لإتمام القرآن الكريم معاً
            </p>
            <div className="hero-buttons">
              <Link
                className="hero-cta primary"
                onClick={handleStartKhatmah}
                to="/registration"
              >
                انشاء ختمة <span className="cta-arrow">←</span>
              </Link>
              <ScrollLink
                className="hero-cta secondary"
                to="Khatmahs"
                smooth={true}
                duration={300}
              >
                انضم الي ختمة{" "}
              </ScrollLink>
            </div>
          </div>
        </div>
        <div className="hero-decorations">
          <div className="decoration decoration-1"></div>
          <div className="decoration decoration-2"></div>
          <div className="decoration decoration-3"></div>
        </div>
      </section>
    </Element>
  );
};

export default HeroSection;
