import React, { useState } from "react";
import {
  FaSignOutAlt as LogOut,
  FaCrown as Crown,
  FaUsers as Users,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import {MainKhatmaCard} from "../reusable/MainKhatmaCard";

const AllKhatmahs = () => {

   //المفروض دي جايه من الباك اند بنفس  المفاتيح ممكن نعدل او نزود حسب الاحتياج ولكن التعديل هنا طبعا هتعدل في المكون نفسه
   const[ khatmahSessions, setKhatmahSessions] = useState([
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
  ]);


  return (
    <section className="myKh_container">
      <div className="myKh_header">
        <div className="myKh_icon">
          <LogOut className="myKh_icon-inner" />
        </div>
        <h2 className="myKh_title">شارك في الختمه المناسبه لك</h2>
      </div>

      <div className="myKh_grid">
          {khatmahSessions.map((khatmah) => (
                <MainKhatmaCard  khatmah={khatmah} key={khatmah.id} />
            ))}
      </div>
    </section>
  );
};




export default  AllKhatmahs;
