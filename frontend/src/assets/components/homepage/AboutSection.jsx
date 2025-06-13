import React from "react";
import "./styles/AboutSection.css";
import quran from "../../imgs/Quran.jpg";
import { FaBook, FaUsers, FaChartBar, FaHandsHelping } from "react-icons/fa";
import { Element } from "react-scroll";
Element;
const AboutSection = () => {
  return (
    <Element name="About">
      <section className="about-section">
        <div className="main-container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="about-headline">ما هي الختمة المشتركه؟</h2>
              <p className="about-description">
                ختمة هي منصة تجمع المسلمين لختم القرآن الكريم كجماعة. انضم إلى
                تلاوات جماعية من خلال اختيار أي جزء يناسبك، وتتبع مساهمتك
                الشخصية في القراءة الجماعية، وابنِ عادة يومية منتظمة أثناء
                التواصل مع مؤمنين حول العالم في هذه الرحلة المباركة من الإيمان
                والتدبر.
              </p>
              <div className="about-steps">
                <CircularFeatures />
              </div>
            </div>
            <div className="about-visual">
              <img src={quran} alt="" className="quran-image" />
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

const features = [
  { icon: <FaHandsHelping />, label: "تعاونوا على البر والتقوى" },
  { icon: <FaUsers />, label: "انضم إلى تلاوات جماعية" },
  { icon: <FaBook />, label: "اختر الجزء الذي تود قراءته" },
  { icon: <FaChartBar />, label: "تابع التقدم الجماعي" },
];

const CircularFeatures = () => {
  return (
    <div className="circle-container">
      {features.map((feature, index) => (
        <div key={index} className="steps-item">
          <div className="steps-icon">
            {index + 1}
            {feature.icon}
          </div>
          <span>{feature.label}</span>
        </div>
      ))}
    </div>
  );
};

export default AboutSection;
