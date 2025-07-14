import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/KhatmahTable.css";
import SuccessMessage from "../reusable/SuccessMessage";
import { ProgressBar } from "../reusable/MainKhatmaCard";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { IoIosRemoveCircle } from "react-icons/io";
import { FaShareNodes } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { fetchProtectedData } from "../../../api";
const API_BASE = "http://127.0.0.1:8087/api"; // Change to your backend URL
const token = localStorage.getItem("accessToken"); // Replace with actual token from login

const KhatmahTable = ({ khatmaId }) => {
  const nav = useNavigate();

  const [response, setResponse] = useState(null); // Used to store and display API responses
  const [juzData, setJuzData] = useState([
    {
      id: 1,
      juzNumber: 1,
      fromVerse: "الفاتحة (1:1)",
      toVerse: "البقرة (2:141)",
      isCompleted: false,
    },
    {
      id: 2,
      juzNumber: 2,
      fromVerse: "البقرة (2:142)",
      toVerse: "البقرة (2:252)",
      isCompleted: false,
    },
    {
      id: 3,
      juzNumber: 3,
      fromVerse: "البقرة (2:253)",
      toVerse: "آل عمران (3:92)",
      isCompleted: false,
    },
    {
      id: 4,
      juzNumber: 4,
      fromVerse: "آل عمران (3:93)",
      toVerse: "النساء (4:23)",
      isCompleted: false,
    },
    {
      id: 5,
      juzNumber: 5,
      fromVerse: "النساء (4:24)",
      toVerse: "النساء (4:147)",
      isCompleted: false,
    },
    {
      id: 6,
      juzNumber: 6,
      fromVerse: "النساء (4:148)",
      toVerse: "المائدة (5:81)",
      isCompleted: false,
    },
    {
      id: 7,
      juzNumber: 7,
      fromVerse: "المائدة (5:82)",
      toVerse: "الأنعام (6:110)",
      isCompleted: false,
    },
    {
      id: 8,
      juzNumber: 8,
      fromVerse: "الأنعام (6:111)",
      toVerse: "الأعراف (7:87)",
      isCompleted: false,
    },
    {
      id: 9,
      juzNumber: 9,
      fromVerse: "الأعراف (7:88)",
      toVerse: "الأنفال (8:40)",
      isCompleted: false,
    },
    {
      id: 10,
      juzNumber: 10,
      fromVerse: "الأنفال (8:41)",
      toVerse: "التوبة (9:92)",
      isCompleted: false,
    },
    {
      id: 11,
      juzNumber: 11,
      fromVerse: "التوبة (9:93)",
      toVerse: "هود (11:5)",
      isCompleted: false,
    },
    {
      id: 12,
      juzNumber: 12,
      fromVerse: "هود (11:6)",
      toVerse: "يوسف (12:52)",
      isCompleted: false,
    },
    {
      id: 13,
      juzNumber: 13,
      fromVerse: "يوسف (12:53)",
      toVerse: "إبراهيم (14:52)",
      isCompleted: false,
    },
    {
      id: 14,
      juzNumber: 14,
      fromVerse: "الحجر (15:1)",
      toVerse: "النحل (16:128)",
      isCompleted: false,
    },
    {
      id: 15,
      juzNumber: 15,
      fromVerse: "الإسراء (17:1)",
      toVerse: "الكهف (18:74)",
      isCompleted: false,
    },
    {
      id: 16,
      juzNumber: 16,
      fromVerse: "الكهف (18:75)",
      toVerse: "طه (20:135)",
      isCompleted: false,
    },
    {
      id: 17,
      juzNumber: 17,
      fromVerse: "الأنبياء (21:1)",
      toVerse: "الحج (22:78)",
      isCompleted: false,
    },
    {
      id: 18,
      juzNumber: 18,
      fromVerse: "المؤمنون (23:1)",
      toVerse: "الفرقان (25:20)",
      isCompleted: false,
    },
    {
      id: 19,
      juzNumber: 19,
      fromVerse: "الفرقان (25:21)",
      toVerse: "النمل (27:55)",
      isCompleted: false,
    },
    {
      id: 20,
      juzNumber: 20,
      fromVerse: "النمل (27:56)",
      toVerse: "العنكبوت (29:45)",
      isCompleted: false,
    },
    {
      id: 21,
      juzNumber: 21,
      fromVerse: "العنكبوت (29:46)",
      toVerse: "الأحزاب (33:30)",
      isCompleted: false,
    },
    {
      id: 22,
      juzNumber: 22,
      fromVerse: "الأحزاب (33:31)",
      toVerse: "يس (36:27)",
      isCompleted: false,
    },
    {
      id: 23,
      juzNumber: 23,
      fromVerse: "يس (36:28)",
      toVerse: "الزمر (39:31)",
      isCompleted: false,
    },
    {
      id: 24,
      juzNumber: 24,
      fromVerse: "الزمر (39:32)",
      toVerse: "فصلت (41:46)",
      isCompleted: false,
    },
    {
      id: 25,
      juzNumber: 25,
      fromVerse: "فصلت (41:47)",
      toVerse: "الجاثية (45:37)",
      isCompleted: false,
    },
    {
      id: 26,
      juzNumber: 26,
      fromVerse: "الأحقاف (46:1)",
      toVerse: "الذاريات (51:30)",
      isCompleted: false,
    },
    {
      id: 27,
      juzNumber: 27,
      fromVerse: "الذاريات (51:31)",
      toVerse: "الحديد (57:29)",
      isCompleted: false,
    },
    {
      id: 28,
      juzNumber: 28,
      fromVerse: "المجادلة (58:1)",
      toVerse: "الملك (67:30)",
      isCompleted: false,
    },
    {
      id: 29,
      juzNumber: 29,
      fromVerse: "الحاقة (69:1)",
      toVerse: "المرسلات (77:50)",
      isCompleted: false,
    },
    {
      id: 30,
      juzNumber: 30,
      fromVerse: "النبأ (78:1)",
      toVerse: "الناس (114:6)",
      isCompleted: false,
    },
  ]);
  // Default headers for all API requests
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const [share, setShare] = useState(false);

  // const handleReaderNameChange = (id, value) => {
  //   setJuzData((prev) =>
  //     prev.map((juz) => {
  //       const isCurrent = juz.id === id;
  //       const newReaderName = isCurrent ? value : juz.readerName;

  //       return {
  //         ...juz,
  //         readerName: isCurrent ? value : juz.readerName,
  //         status: newReaderName.trim() !== "" ? "محجوز" : "متاح",
  //       };
  //     })
  //   );
  // };

  const handleCompletionChange = (id, checked) => {
    setJuzData((prev) =>
      prev.map((juz) =>
        juz.id === id ? { ...juz, isCompleted: checked } : juz
      )
    );
  };

  // Get all chapters and their completion status + who completed + khatma completion %
  const showChapterStatus = (khatmaId) => {
    fetch(`${API_BASE}/stats/khatma/${khatmaId}/`, { headers })
      .then(async (res) => {
        const text = await res.text();

        // ✅ التحقق من حالة الاستجابة
        if (res.status == 401) {
          nav("/registration");
        }

        try {
          const json = JSON.parse(text);
          const takenChapters = Array.from({ length: 30 }, (_, i) => {
            const chapterNumber = i + 1;
            const match = json.chapter_completion_status.find(
              (ch) => ch.chapter === chapterNumber
            );
            return {
              chapter: chapterNumber,
              taken: Boolean(match),
              is_completed: match?.is_completed || false,
              assigned_user: match?.assigned_user || null,
            };
          });

          setResponse({
            completion_percentage: json.completion_percentage,
            chapters: takenChapters,
          });
        } catch (parseError) {
          console.error("JSON parse error:", parseError);
          console.log("Raw response text:", text);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err.message);
      });
  };

  //to send a user that choose a jus
  const handleRegest = (juzData, index) => {
    console.log("كده دخلنا فانكشن الارسال");
    console.log(juzData[index].juzNumber, juzData[index].isCompleted);
    const chooseJuz = async () => {
      try {
        await fetchProtectedData(`/api/khatmas/${khatmaId}/sessions/`, {
          method: "POST",
          data: {
            chapter_assigned: juzData[index].juzNumber,
            is_completed: juzData[index].isCompleted,
          },
        });
        showChapterStatus(khatmaId);
        console.log(response);
      } catch (error) {
        if (error.response) {
          console.log("Error status:", error.response.status);
          console.log("Error data:", error.response.data); // دا مهم جدا
        } else {
          console.error("Unknown error:", error.message);
        }
      }
    };

    chooseJuz();
  };

  useEffect(() => {
    showChapterStatus(khatmaId);
  }, []);

  // useEffect(() => {
  //   console.log(response);
  // }, [response]);

  return response ? (
    <div className="quran-table-container">
      <div className="table-header">
        <div className="table-header-content">
          <h1 className="table-title">جدول متابعة تلاوة القرآن الكريم</h1>
          <p className="table-subtitle">
            تتبع تقدمك في تلاوة الأجزاء الثلاثين من القرآن الكريم
          </p>
        </div>

        <div className="table-header-options">
          <div className="table-type">ختمه خاصه</div>
          <div
            className="share-icon"
            onClick={() => {
              setShare(true);
            }}
          >
            <FaShareNodes />
          </div>
          {share && (
            <ShareLink
              setShare={setShare}
              link="#  Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem debitis ratione, esse beatae vel voluptatibus illum nam distinctio blanditiis voluptatem, dolorum sequi tenetur officia explicabo ducimus reiciendis voluptates accusamus tempora!
"
            />
          )}
          <Link className="back" to="/UserDashboard">
            <FaChevronLeft />
          </Link>
        </div>
      </div>
      <ProgressBar progress={response.completion_percentage} />
      <Intentions />
      <div className="table-wrapper">
        <h1 className="creator">مسؤل الختمه : شهاب احمد</h1>
        <table className="quran-table">
          <thead>
            <tr>
              <th>اختار جزء</th>
              <th>الجزء رقم</th>
              <th>من سورة</th>
              <th>إلى سورة</th>
              <th>الحالة</th>
              <th>تم الإنجاز؟</th>
            </tr>
          </thead>
          <tbody>
            {juzData.map((juz, index) => (
              <tr
                key={juz.id}
                className={juz.isCompleted ? "completed-row" : ""}
              >
                <td>
                  {response.chapters[index].assigned_user ? (
                    <h1>{response.chapters[index].assigned_user}</h1>
                  ) : (
                    <input
                      type="button"
                      value="هقرأ الجزء ده"
                      onClick={() =>
                        // handleReaderNameChange(juz.id, e.target.value)
                        handleRegest(juzData, index)
                      }
                      className="reader-input"
                    />
                  )}
                </td>
                <td>
                  <span className="juz-number">{juz.juzNumber}</span>
                </td>
                <td className="verse-text">{juz.fromVerse}</td>
                <td className="verse-text">{juz.toVerse}</td>
                <td>
                  <span
                    className={`status-badge ${
                      !response.chapters[index].taken ? "green" : "red"
                    }`}
                  >
                    {!response.chapters[index].taken ? "متاح" : "محجوز"}
                  </span>
                </td>
                <td>
                  <input
                    type="checkbox"
                    checked={response.chapters[index].is_completed}
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
  ) : null;
};

function Intentions() {
  //هتتخزن في الداتا بيز وتيجي منها
  const [intention, setIntention] = useState([""]);
  const [successMessage, setSuccessMessage] = useState("");

  //هبعت النوايا للباك اند
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement intetionsKhatma logic
    const intetionsKhatma = async () => {
      try {
        if (intention.length > 0) {
          await fetchProtectedData("api/khatmas/", {
            method: "POST",
            data: JSON.stringify({
              intention: intention,
            }),
          });
          setSuccessMessage("تم حفظ النية بنجاح");
          setTimeout(() => {
            setSuccessMessage("");
          }, 1000);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    intetionsKhatma();
  };

  //هتعدل النوايا
  const EditIntention = (newIntention, index) => {
    setIntention((prev) =>
      prev.map((item, i) => (i === index ? newIntention : item))
    );
  };

  //هتضيف نوايا
  const handleAddIntention = () => {
    setIntention([...intention, "اكتب نيتك هنا"]);
  };

  //هتحذف نوايا
  const handleRemoveIntention = (index) => {
    setIntention((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="intentions">
      <h3 className="intentions-title">
        {" "}
        لكل ختمه نية, يا تري اي نواياك في الختمه دي؟!{" "}
      </h3>
      <form onSubmit={handleSubmit} className="intentions-form">
        {intention.map((intention, index) => (
          <div key={index} className="intention-item">
            <IoIosRemoveCircle
              className="remove-icon"
              onClick={() => handleRemoveIntention(index)}
            />
            <textarea
              className="intentions-textarea"
              value={intention}
              onChange={(e) => EditIntention(e.target.value, index)}
              placeholder="اكتب نيتك في هذه الختمة  "
              rows="4"
              required
            />
          </div>
        ))}

        <div className="intentions-buttons">
          <div onClick={handleAddIntention} className="intentions-button">
            <FaPlus />
          </div>

          <button type="submit" className="intentions-button">
            حفظ النية
          </button>
        </div>
      </form>
      {successMessage && <SuccessMessage successMessage={successMessage} />}
    </div>
  );
}

function ShareLink({ link = "#lol", setShare }) {
  const [copyed, setCopyed] = useState(false);
  return (
    <div className="sharelink">
      <span
        onClick={() => {
          setCopyed(true);
          setTimeout(() => {
            setShare(false);
          }, 500);
        }}
      >
        {" "}
        {copyed ? <IoMdDoneAll /> : <FaCopy />}
      </span>
      <p>{link}</p>
    </div>
  );
}
export default KhatmahTable;
