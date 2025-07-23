import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdGroups, MdOutlineEmojiEvents } from "react-icons/md";
import { BsBook } from "react-icons/bs";
import "./styles/createKhatma.css";
import { fetchProtectedData } from "../../../api";
const CreateKhatma = ({ setActiveSection }) => {
  const [khatmaDetails, setKhatmaDetails] = useState({
    name: "",
    description: "",
    type: "",
    duration: "",
  });

  const main_khatma_type = [
    {
      type: "group",
      icon: MdGroups,
      title: "ختمة جماعية",
      color: "emerald",
    },
    {
      type: "private",
      icon: MdOutlineEmojiEvents,
      title: "ختمة خاصة",
      color: "purple",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setKhatmaDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement khatma creation logic
    const createKhatma = async () => {
      try {
        const res = await fetchProtectedData("api/khatmas/", {
          method: "POST",
          data: JSON.stringify({
            name: khatmaDetails.name,
            khatma_type: khatmaDetails.type,
            target_days: khatmaDetails.duration,
            is_public: khatmaDetails.type === "private" ? false : true,
            description: khatmaDetails.description,
          }),
        });
        console.log(res);
        setTimeout(() => {
          setActiveSection("overview");
        }, 300);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    createKhatma();
  };

  return (
    <section className="create-khatma-container">
      <div className="header-section">
        <div className="icon-container">
          <FaPlus className="plus-icon" />
        </div>
        <h2 className="title">إنشاء ختمة جديدة</h2>
        <p className="subtitle">ابدأ رحلة روحانية جديدة مع الأحباب</p>
      </div>

      <div className="khatma-types-grid">
        {main_khatma_type.map((item, i) => (
          <div
            key={i}
            className={`khatma-type-card`}
            onClick={() =>
              setKhatmaDetails((prev) => ({ ...prev, type: item.type }))
            }
          >
            <div className="card-content">
              <item.icon className={`type-icon ${item.color}`} />
              <h3 className={`type-title ${item.color}`}>{item.title}</h3>
              <p className="type-description">
                {item.type === "group"
                  ? "ختمة عامة للكل ستظهر علي الموقع واي شخص يستطيع المشاركه"
                  : "ختمة مخصصه لك لن تظهر علي الموقع للكل وانما ستحصل علي رابط تبعثه لمن تريده المشاركه"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className={`details-form`}>
        <h3 className="form-title">
          <BsBook className="form-icon" />
          تفاصيل الختمة
        </h3>
        <div className="form-content">
          <input
            type="text"
            name="name"
            value={khatmaDetails.name}
            onChange={handleInputChange}
            placeholder="اسم الختمة"
            className={`form-input`}
          />
          <textarea
            name="description"
            value={khatmaDetails.description}
            onChange={handleInputChange}
            placeholder="وصف الختمة (اختياري)"
            rows="3"
            className={`form-input}`}
          />
          <select
            name="type"
            value={khatmaDetails.type}
            onChange={handleInputChange}
            className={`form-input`}
          >
            <option value="">نوع الختمه</option>
            <option value="private">خاصه</option>
            <option value="group">عامة</option>
          </select>
          <div className="form-footer">
            <input
              type="number"
              name="duration"
              value={khatmaDetails.duration}
              min={1}
              onChange={handleInputChange}
              placeholder="مدة الختمة بالأيام"
              className={`form-input`}
            />

            <button type="submit" className="submit-button">
              إنشاء الختمة
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CreateKhatma;
