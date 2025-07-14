import React, { useEffect, useState } from "react";
import {
  FaSignOutAlt as LogOut,
  FaCrown as Crown,
  FaUsers as Users,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { MainKhatmaCard } from "../reusable/MainKhatmaCard";
import { fetchProtectedData } from "../../../api";

const AllKhatmahs = () => {
  //المفروض دي جايه من الباك اند بنفس  المفاتيح ممكن نعدل او نزود حسب الاحتياج ولكن التعديل هنا طبعا هتعدل في المكون نفسه
  const [khatmahSessions, setKhatmahSessions] = useState([]);

  const fetchkhatmahSessions = async () => {
    try {
      const khatmahSessions = await fetchProtectedData(
        "api/khatmas/?filter=public"
      );
      console.log(khatmahSessions);
      setKhatmahSessions(khatmahSessions.results);
    } catch (error) {
      console.error("Error fetching khatmah sessions:");
    }
  };

  useEffect(() => {
    fetchkhatmahSessions();
  }, []);
  return (
    <section className="myKh-container">
      <div className="myKh-header">
        <div className="myKh-icon">
          <LogOut className="myKh-icon-inner" />
        </div>
        <h2 className="myKh-title">شارك في الختمه المناسبه لك</h2>
      </div>

      <div className="myKh-grid">
        {khatmahSessions
          ? khatmahSessions.map((khatmah) => (
              <MainKhatmaCard khatmah={khatmah} key={khatmah.id} />
            ))
          : null}
      </div>
    </section>
  );
};

export default AllKhatmahs;

//joinable

//  {
//       id: 1,
//       title: "ختمة رمضان العالمية",
//       participants: 45,
//       progress: 78,
//       status: "available",
//       description: "انضم إلى مجتمعنا العالمي لختم القرآن الكريم في رمضان",
//     },
