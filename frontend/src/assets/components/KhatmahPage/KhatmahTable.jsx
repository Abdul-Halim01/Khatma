import React, { useState } from "react";
import "./styles/KhatmahTable.css";
import SuccessMessage from "../reusable/SuccessMessage";
import { ProgressBar } from "../reusable/MainKhatmaCard";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
const KhatmahTable = () => {
  const [juzData, setJuzData] = useState([
    {
      id: 1,
      juzNumber: 1,
      readerName: "",
      fromVerse: "الفاتحة (1:1)",
      toVerse: "البقرة (2:141)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 2,
      juzNumber: 2,
      readerName: "",
      fromVerse: "البقرة (2:142)",
      toVerse: "البقرة (2:252)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 3,
      juzNumber: 3,
      readerName: "",
      fromVerse: "البقرة (2:253)",
      toVerse: "آل عمران (3:92)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 4,
      juzNumber: 4,
      readerName: "",
      fromVerse: "آل عمران (3:93)",
      toVerse: "النساء (4:23)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 5,
      juzNumber: 5,
      readerName: "",
      fromVerse: "النساء (4:24)",
      toVerse: "النساء (4:147)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 6,
      juzNumber: 6,
      readerName: "",
      fromVerse: "النساء (4:148)",
      toVerse: "المائدة (5:81)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 7,
      juzNumber: 7,
      readerName: "",
      fromVerse: "المائدة (5:82)",
      toVerse: "الأنعام (6:110)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 8,
      juzNumber: 8,
      readerName: "",
      fromVerse: "الأنعام (6:111)",
      toVerse: "الأعراف (7:87)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 9,
      juzNumber: 9,
      readerName: "",
      fromVerse: "الأعراف (7:88)",
      toVerse: "الأنفال (8:40)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 10,
      juzNumber: 10,
      readerName: "",
      fromVerse: "الأنفال (8:41)",
      toVerse: "التوبة (9:92)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 11,
      juzNumber: 11,
      readerName: "",
      fromVerse: "التوبة (9:93)",
      toVerse: "هود (11:5)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 12,
      juzNumber: 12,
      readerName: "",
      fromVerse: "هود (11:6)",
      toVerse: "يوسف (12:52)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 13,
      juzNumber: 13,
      readerName: "",
      fromVerse: "يوسف (12:53)",
      toVerse: "إبراهيم (14:52)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 14,
      juzNumber: 14,
      readerName: "",
      fromVerse: "الحجر (15:1)",
      toVerse: "النحل (16:128)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 15,
      juzNumber: 15,
      readerName: "",
      fromVerse: "الإسراء (17:1)",
      toVerse: "الكهف (18:74)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 16,
      juzNumber: 16,
      readerName: "",
      fromVerse: "الكهف (18:75)",
      toVerse: "طه (20:135)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 17,
      juzNumber: 17,
      readerName: "",
      fromVerse: "الأنبياء (21:1)",
      toVerse: "الحج (22:78)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 18,
      juzNumber: 18,
      readerName: "",
      fromVerse: "المؤمنون (23:1)",
      toVerse: "الفرقان (25:20)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 19,
      juzNumber: 19,
      readerName: "",
      fromVerse: "الفرقان (25:21)",
      toVerse: "النمل (27:55)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 20,
      juzNumber: 20,
      readerName: "",
      fromVerse: "النمل (27:56)",
      toVerse: "العنكبوت (29:45)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 21,
      juzNumber: 21,
      readerName: "",
      fromVerse: "العنكبوت (29:46)",
      toVerse: "الأحزاب (33:30)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 22,
      juzNumber: 22,
      readerName: "",
      fromVerse: "الأحزاب (33:31)",
      toVerse: "يس (36:27)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 23,
      juzNumber: 23,
      readerName: "",
      fromVerse: "يس (36:28)",
      toVerse: "الزمر (39:31)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 24,
      juzNumber: 24,
      readerName: "",
      fromVerse: "الزمر (39:32)",
      toVerse: "فصلت (41:46)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 25,
      juzNumber: 25,
      readerName: "",
      fromVerse: "فصلت (41:47)",
      toVerse: "الجاثية (45:37)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 26,
      juzNumber: 26,
      readerName: "",
      fromVerse: "الأحقاف (46:1)",
      toVerse: "الذاريات (51:30)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 27,
      juzNumber: 27,
      readerName: "",
      fromVerse: "الذاريات (51:31)",
      toVerse: "الحديد (57:29)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 28,
      juzNumber: 28,
      readerName: "",
      fromVerse: "المجادلة (58:1)",
      toVerse: "الملك (67:30)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 29,
      juzNumber: 29,
      readerName: "",
      fromVerse: "الحاقة (69:1)",
      toVerse: "المرسلات (77:50)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
    {
      id: 30,
      juzNumber: 30,
      readerName: "",
      fromVerse: "النبأ (78:1)",
      toVerse: "الناس (114:6)",
      status: "متاح",
      isCompleted: false,
      notes: "",
    },
  ]); 

  const handleReaderNameChange = (id, value) => {
    setJuzData((prev) =>
      prev.map((juz) => {
        const isCurrent = juz.id === id;
        const newReaderName = isCurrent ? value : juz.readerName;
  
        return {
          ...juz,
          readerName: isCurrent ? value : juz.readerName,
          status: newReaderName.trim() !== "" ? "محجوز" : "متاح",
        };
      })
    );
  };
  

  const handleCompletionChange = (id, checked) => {
    setJuzData((prev) =>
      prev.map((juz) =>
        juz.id === id ? { ...juz, isCompleted: checked } : juz
      )
    );
  };

  return (
    <div className="quran-table-container">
      <div className="table-header">
       <div className="table-header-content">
       <h1 className="table-title">جدول متابعة تلاوة القرآن الكريم</h1>
        <p className="table-subtitle">
          تتبع تقدمك في تلاوة الأجزاء الثلاثين من القرآن الكريم
        </p>
       </div>
        <Link className="back" to="/UserDashboard">
              <FaChevronLeft />
            </Link>
      </div>
      <ProgressBar progress={80}/>
      <Intentions  />
      <div className="table-wrapper">
        <h1 className="creator">مسؤل الختمه : شهاب احمد</h1>
        <table className="quran-table">
          <thead>
            <tr>
              <th>اسم القارئ</th>
              <th>الجزء رقم</th>
              <th>من سورة</th>
              <th>إلى سورة</th>
              <th>الحالة</th>
              <th>تم الإنجاز؟</th>
            </tr>
          </thead>
          <tbody>
            {juzData.map((juz) => (
              <tr
                key={juz.id}
                className={juz.isCompleted ? "completed-row" : ""}
              >
                <td>
                  <input
                    type="text"
                    value={juz.readerName}
                    onChange={(e) =>
                      handleReaderNameChange(juz.id, e.target.value)
                    }
                    placeholder="اسم القارئ"
                    className="reader-input"
                  />
                </td>
                <td>
                  <span className="juz-number">{juz.juzNumber}</span>
                </td>
                <td className="verse-text">{juz.fromVerse}</td>
                <td className="verse-text">{juz.toVerse}</td>
                <td>
                  <span
                    className={`status-badge ${
                      juz.status == "متاح" ? "green" : "red"
                    }`}
                  >
                    {juz.status}
                  </span>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={juz.isCompleted}
                    onChange={(e) =>
                      handleCompletionChange(juz.id, e.target.checked)
                    }
                    className="completion-checkbox"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


function Intentions() {
  //هتتخزن في الداتا بيز وتيجي منها 
  const [intention, setIntention] = useState('1-...... \n2-...... \n3-...... ');
  const [successMessage, setSuccessMessage] = useState('');
  //هبعت النوايا للباك اند
  const handleSubmit = (e) => {
    e.preventDefault();
    if (intention.trim()) {
      setIntention('');
      setSuccessMessage('تم حفظ النية بنجاح');
      setTimeout(() => {
        setSuccessMessage('');
      }, 1000);
    }
  };

  return (
    <div className="intentions">
      <h3 className="intentions-title"> لكل ختمه نية, يا تري اي نواياك في الختمه دي؟! </h3>
      <form onSubmit={handleSubmit} className="intentions-form">
        <textarea
          className="intentions-textarea"
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="اكتب نيتك في هذه الختمة  "
         rows="4"
          required
        />
        <button type="submit" className="intentions-submit">
          حفظ النية
        </button>
      </form>
      {successMessage && <SuccessMessage successMessage={successMessage} />}
        </div>
  );
}

export default KhatmahTable;
