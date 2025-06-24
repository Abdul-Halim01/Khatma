import React from "react";
import {
  FaChartBar,
  FaHandshake,
  FaLock,
  FaGlobe,
  FaUserShield,
  FaUsers,
  FaVenusMars,
} from "react-icons/fa";
import "./styles/FeaturesSection.css";
import { Element } from "react-scroll";

const features = [
  {
    icon: <FaChartBar />,
    title: "تابع تقدمك في قراءة القرآن",
    description:
      "راقب بسهولة الأجزاء التي أنهيتها من القرآن مع مؤشرات تقدم وتعقب بصري.",
  },
  {
    icon: <FaHandshake />,
    title: "انضم إلى تلاوات جماعية في أي وقت",
    description:
      "شارك في ختمات مستمرة من أي مكان في العالم، لتعزيز روح الجماعة والتعلم المشترك.",
  },
  {
    icon: <FaLock />,
    title: "أنشئ ختمات خاصة أو عامة",
    description:
      "ابدأ جلسة قراءة جماعية يمكن أن تكون مفتوحة للجميع أو دعوات فقط لأصدقائك المقربين.",
  },
  {
    icon: <FaUserShield />,
    title: "مسؤول الختمة للتنظيم والمتابعة",
    description:
      "كل ختمة لها مسؤول يذكّر المشاركين، يتابع التقدم، ويرسل تنبيهات لضمان الاستمرارية والتعاون.",
  },
  {
    icon: <FaUsers />,
    title: "كوّن رفقة صالحة للتلاوة الدورية",
    description:
      "اجمع أصدقاءك أو تعرف على مشاركين جدد لبناء علاقة قائمة على التعاون في تلاوة القرآن بانتظام.",
  },
  {
    icon: <FaVenusMars />,
    title: "ختمات مخصصة للشباب أو الفتيات",
    description:
      "اختر ختمة تناسبك: ختمات مخصصة للشباب، وأخرى للفتيات، لتوفير بيئة آمنة ومريحة للجميع.",
  },
];

const Features = () => {
  return (
    <Element name="Features">
      <section className="features-section" aria-labelledby="features-heading">
        <div className="features-container">
          <header className="features-header">
            <h2 id="features-heading" className="features-title">
              لماذا تستخدم منصتنا لختمة القرآن؟
            </h2>
            <p className="features-subtitle">
              انضم إلى آلاف المسلمين حول العالم في رحلتهم لإتمام حفظ القرآن
              الكريم. توفر منصتنا الأدوات والدعم المجتمعي اللازم للبقاء متحفزًا
              ومتواصلًا.
            </p>
          </header>

          <div className="features-grid" role="list">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} />
            ))}
          </div>
        </div>
      </section>
    </Element>
  );
};

function FeatureCard({feature}) {
  return (
    <div className="feature-card">
      <span className="feature-icon">{feature.icon}</span>
      <h3 className="feature-title">{feature.title}</h3>
      <p className="feature-description">{feature.description}</p>
    </div>
  )
}

export default Features;
