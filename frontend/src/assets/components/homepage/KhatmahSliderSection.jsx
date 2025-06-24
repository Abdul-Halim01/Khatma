import React, { useState } from "react";
import {
  FaChevronRight,
  FaChevronLeft,
  FaMosque,
} from "react-icons/fa";

import "./styles/SliderSection.css";
import { Element } from "react-scroll";
import {MainKhatmaCard} from "../reusable/MainKhatmaCard";

const KhatmahSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  //المفروض دي جايه من الباك اند بنفس  المفاتيح ممكن نعدل او نزود حسب الاحتياج ولكن التعديل هنا طبعا هتعدل في المكون نفسه
  const khatmahSessions = [
    {
      id: 1,
      title: "ختمة رمضان العالمية",
      participants: 45,
      progress: 78,
      status: "available",
      description: "انضم إلى مجتمعنا العالمي لختم القرآن الكريم في رمضان",
    },
    {
      id: 2,
      title: "ختمة نهاية الأسبوع",
      participants: 23,
      progress: 34,
      status: "available",
      description:
        "مثالية للتأمل الروحي في عطلة نهاية الأسبوع والتواصل المجتمعي",
    },
    {
      id: 3,
      title: "ختمة الشباب",
      participants: 18,
      progress: 56,
      status: "available",
      description: "ختمة مخصصة للشباب للتواصل مع القرآن الكريم",
    },
    {
      id: 4,
      title: "ختمة المساء",
      participants: 31,
      progress: 89,
      status: "reserved",
      description: "جلسات مسائية يومية لختم القرآن الكريم بشكل منتظم",
    },
    {
      id: 5,
      title: "ختمة المبتدئين",
      participants: 12,
      progress: 100,
      status: "completed",
      description: "تمت! مقدمة لطيفة للمبتدئين في تلاوة القرآن الكريم",
    },
  ];

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? 0 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) =>
      prev === khatmahSessions.length - 1
        ? khatmahSessions.length - 1
        : prev + 1
    );
  };

  return (
    <Element name="Khatmahs">
      <section className="khatmah-slider-container" dir="rtl">
        <div className="slider-header">
          <h2 className="slider-title">
            <FaMosque style={{ marginLeft: "8px" }} />
            ختمات قرآنية عامة
          </h2>
          <p className="slider-subtitle">
            شارك في ختم القرآن الكريم مع مجتمعنا
          </p>
        </div>

        <div className="slider-wrapper">
          <button
            className="nav-button next-button"
            onClick={goToPrevious}
            aria-label="الشريحة السابقة"
          >
            <FaChevronRight />
          </button>

          <div
            className="slider-track"
            style={{
              transform: `translateX(${currentSlide * 100}%)`,
            }}
          >
            {khatmahSessions.map((khatmah) => (
              <div key={khatmah.id} className="slide">
                <MainKhatmaCard  khatmah={khatmah} />
              </div>
            ))}
          </div>

          <button
            className="nav-button prev-button"
            onClick={goToNext}
            aria-label="الشريحة التالية"
          >
            <FaChevronLeft />
          </button>
        </div>

       
      </section>
    </Element>
  );
};



export default KhatmahSlider;
