import React, { useState, useEffect, useRef, useMemo } from "react";
import "./UltimateCreditCardMerged.css";
import { useNavigate, useOutletContext } from "react-router-dom";

// --- IMAGE IMPORTS ---
import creditCardImg from "./images/creditcard.png";
import sfRewardPointsBg from "./images/special-features/reward_points_bg.jpg";
import sfCashbackDutyFreeBg from "./images/special-features/cashback_duty_free_bg.jpg";
import sfPriorityPassBg from "./images/special-features/priority_pass_bg.jpg";
import sfGolfPrivilegesBg from "./images/special-features/golf_privileges_bg.jpg";
import sfAirAccidentInsuranceBg from "./images/special-features/air_accident_insurance_bg.jpg";
import sfForexMarkupBg from "./images/special-features/forex_markup_bg.jpg";
import rAirTravelRedemptionsBg from "./images/rewards/air_travel_redemptions_bg.jpg";
import rHotelStayBg from "./images/rewards/hotel_stay_bg.jpg";
import rAirportPrivilegesBg from "./images/rewards/airport_privileges_bg.jpg";
import rExperiencesToursBg from "./images/rewards/experiences_tours_bg.jpg";
import rTravelUtilitiesBg from "./images/rewards/travel_utilities_bg.jpg";
import rBonusMultiplierBg from "./images/rewards/bonus_multiplier_bg.jpg";
import pStyleBg from "./images/privileges/ultimatecc_privileges_style_bg.jpg";
import pHotelsBg from "./images/privileges/ultimatecc_privileges_hotels_bg.jpg";
import pEventsBg from "./images/privileges/ultimatecc_privileges_events_bg.jpg";
import pConciergeBg from "./images/privileges/ultimatecc_privileges_concierge_bg.jpg";

// --- REACT ICONS IMPORT (ADDED) ---
import {
  MdPhoneIphone,
  MdQrCode2,
  MdSecurity,
  MdContactless,
  MdGroup,
  MdDataSaverOn,
  MdSyncAlt,
  MdPhoneInTalk,
  MdCardGiftcard,
  MdShoppingBasket,
} from "react-icons/md";

// --- DATA ARRAYS ---
const benefits = [
  "5 Reward Points on every ₹150 spent (1 RP = ₹1 value)",
  "5% cashback on duty-free spends (up to ₹1,000/month)",
  "Complimentary Priority Pass for airport lounges (domestic/international)",
  "Annual Fee: ₹5,000 + GST (Welcome: 6,000 reward points)",
  "Golf privileges: 1 free game & 1 coaching every month",
  "Air accident insurance worth ₹1 crore",
  "Low 2% foreign exchange markup",
];
const rewardBenefitMessages = [
  "Earn 6000 Reward Points* worth Rs. 6000 on payment of joining fee with Ultimate Credit Card.",
  "5 Reward Points on every ₹150 spent (1 RP = ₹1 value)",
  "5% cashback on duty-free spends (up to ₹1,000/month)",
  "Complimentary Priority Pass for airport lounges (domestic/international)",
  "Annual Fee: ₹5,000 + GST (Welcome: 6,000 reward points)",
  "Golf privileges: 1 free game & 1 coaching every month",
  "Air accident insurance worth ₹1 crore",
  "Low 2% foreign exchange markup",
];
const feesItems = [
  { charge: "Joining fees", detail: "INR 5,000" },
  { charge: "Renewal fees", detail: "INR 5,000" },
  { charge: "Supplementary card – Joining fees", detail: "Nil" },
  { charge: "Supplementary card – Renewal fees", detail: "Nil" },
];
const eligibilityItems = [
  { charge: "Age", detail: "Applicant's age should be between 21 and 65." },
  {
    charge: "Monthly Income",
    detail: "Applicant should have a stable monthly income.",
  },
  {
    charge: "Other Requirements",
    detail:
      "Applicant should belong to credit cards sourcing cities/locations of the Bank. All applications are subject to credit and other policy checks of the Bank.",
  },
];
const documentItems = [
  {
    charge: "You will need",
    detail:
      "Identity Proof (Any One of the following Photo cards): Passport, Voter Id Card, Govt ID, etc.",
  },
  { charge: "PAN Card", detail: "PAN Card is mandatory." },
  {
    charge: "Address Proof",
    detail:
      "Any One of the following documents with current residence address: Aadhaar Card, Passport, Driving License, Election/Voter's ID Card, Job card issued by NREGA duly signed by an officer of the State Government, The letter issued by the National Population Register containing details of name, address.",
  },
  { charge: "Photograph", detail: "1 recent passport-sized Photograph." },
  {
    charge: "Financial documents for salaried",
    detail: "Latest one month salary slip.",
  },
  {
    charge: "Financial documents for self-employed (Businessmen)",
    detail:
      "Latest IT Returns with computation of income / Certified Financials, Last Business Continuity proof.",
  },
  {
    charge: "Financial documents for self-employed (Professionals)",
    detail: "Latest IT Returns, Business Continuity proof.",
  },
];
const valueChartRows = [
  { charge: "Annual Benefits of using Ultimate Credit Card", detail: "" },
  { charge: "4 golf sessions (INR 5,000 per visit)", detail: "₹20,000" },
  {
    charge: "6 domestic lounge visits (INR 1,400 per visit)",
    detail: "₹8,400",
  },
  {
    charge: "4 global lounge visits with priority pass (INR 2,300 per visit)",
    detail: "₹9,200",
  },
  {
    charge:
      "Cashback on duty free outlets (INR 1,000 cashback – 2 visit / year)",
    detail: "₹2,000",
  },
  {
    charge: "1.5% cashback on your foreign mark up (INR 50,000 / Year)",
    detail: "₹750",
  },
  {
    charge: "Rewards points on total annual spends (with 2 examples)",
    detail: "",
  },
  {
    charge:
      "e.g., 1) avg INR 600,000/year 5 reward points / INR 150 = ₹20,000 on all spends except below categories mentioned in e.g. (2)",
    detail: "₹26,000",
  },
  {
    charge:
      "e.g., 2) avg INR 300,000/year 3 reward points / INR 150 = ₹6,000 on Utilities, Supermarkets, Insurance, Property management, Schools & Government payments",
    detail: "",
  },
  {
    charge:
      "1% fuel surcharge waiver (On spend of INR 15,000/month i.e., INR 150 waiver per month)",
    detail: "₹1,800",
  },
  {
    charge:
      "Rewards point on paying joining fee (6,000 rewards points worth INR 6,000)",
    detail: "₹6,000",
  },
  { charge: "Total Benefits for Customer", detail: "₹74,150" },
  { detail: "For Illustration purposes only, Terms & Conditions apply*" },
];
const termsItems = [
  {
    charge: "Credit Card - Terms and Conditions",
    detail: (
      <a
        href="https://av.sc.com/in/content/docs/in-credit-card-terms-and-condition.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>click here</u>
      </a>
    ),
  },
  {
    charge: "Credit Card - Terms and Conditions (Hindi)",
    detail: (
      <a
        href="https://av.sc.com/in/content/docs/in-sc-credit-card-terms-and-condition-Hindi.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>click here</u>
      </a>
    ),
  },
  {
    charge: "Credit Card - Terms and Conditions (Kannada)",
    detail: (
      <a
        href="https://av.sc.com/in/content/docs/in-sc-credit-card-terms-and-condition-Kannada.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>click here</u>
      </a>
    ),
  },
  {
    charge: "Credit Card - Terms and Conditions (Marathi)",
    detail: (
      <a
        href="https://av.sc.com/in/content/docs/in-sc-credit-card-terms-and-condition-Marathi.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>click here</u>
      </a>
    ),
  },
  {
    charge: "Credit Card - Terms and Conditions (Tamil)",
    detail: (
      <a
        href="https://av.sc.com/in/content/docs/in-sc-credit-card-terms-and-condition-Tamil.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>click here</u>
      </a>
    ),
  },
  {
    charge: "Credit Card - Terms and Conditions (Telugu)",
    detail: (
      <a
        href="https://av.sc.com/in/content/docs/in-sc-credit-card-terms-and-condition-Telugu.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>click here</u>
      </a>
    ),
  },
  {
    charge: "Credit Card - Terms and Conditions (Bengali)",
    detail: (
      <a
        href="https://av.sc.com/in/content/docs/in-sc-credit-card-terms-and-condition-Bengali.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>click here</u>
      </a>
    ),
  },
  {
    charge: "Client Terms and Conditions",
    detail: (
      <a
        href="https://av.sc.com/in/content/docs/India-Client-Terms.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>click here</u>
      </a>
    ),
  },
  {
    charge: "Ultimate Credit Card – Terms & Conditions",
    detail: (
      <a
        href="https://av.sc.com/in/content/docs/in-ultimate-credit-card-tnc.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>click here</u>
      </a>
    ),
  },
  {
    charge: "Most Important Document",
    detail: (
      <a
        href="https://av.sc.com/in/content/docs/in-common-stmnt-reverse-ultimate.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <u>click here</u>
      </a>
    ),
  },
];
const specialFeaturesSlides = [
  {
    title: "5 Reward Points on Every ₹150 Spent (1 RP = ₹1 Value)",
    description:
      "Earn generous reward points on your everyday purchases. For every ₹150 you spend on retail transactions, you receive 5 reward points, each equivalent to ₹1 in value. That means every swipe brings you closer to redeeming exciting vouchers, merchandise, or statement credits — offering a direct, high-value return on your spending.",
    imageName: sfRewardPointsBg,
  },
  {
    title: "5% Cashback on Duty-Free Spends (Up to ₹1,000/month)",
    description:
      "Travel in style and save while you shop internationally. Enjoy 5% cashback on all your duty-free purchases at airports worldwide, with savings of up to ₹1,000 each month. Whether you're picking up luxury goods, fragrances, or souvenirs, your card ensures you spend smart.",
    imageName: sfCashbackDutyFreeBg,
  },
  {
    title: "Complimentary Priority Pass for Airport Lounges",
    description:
      "Experience luxury and comfort while traveling. Your card comes with a complimentary Priority Pass membership, giving you access to over 1,300 airport lounges globally. Enjoy refreshments, Wi-Fi, comfortable seating, and a peaceful atmosphere — both at domestic and international terminals.",
    imageName: sfPriorityPassBg,
  },
  {
    title: "Golf Privileges: 1 Free Game & 1 Coaching Session Every Month",
    description:
      "For the golf enthusiast in you, enjoy complimentary green fees at select premium golf courses across India. Plus, enhance your skills with one free professional coaching session every month — perfect for both seasoned players and beginners.",
    imageName: sfGolfPrivilegesBg,
  },
  {
    title: "Air Accident Insurance Worth ₹1 Crore",
    description:
      "Travel worry-free with comprehensive air accident coverage of ₹1 crore. This benefit ensures your loved ones are financially protected in case of unforeseen air travel incidents.",
    imageName: sfAirAccidentInsuranceBg,
  },
  {
    title: "Low 2% Foreign Exchange Markup",
    description:
      "Shop, dine, and spend globally without worrying about high forex charges. With a competitive 2% foreign exchange markup, you save more on international transactions compared to the standard 3.5% charged by most cards.",
    imageName: sfForexMarkupBg,
  },
];
const rewardsSlides = [
  {
    title: "Air Travel Redemptions",
    description:
      "Free Domestic Flights – Redeem RPs for flights with IndiGo, Air India, and Vistara. International Flight Savings – Part-pay or fully redeem tickets for Emirates, Singapore Airlines, Qatar Airways. Business Class Upgrades – Use RPs to upgrade from Economy to Business on select airlines.",
    imageName: rAirTravelRedemptionsBg,
  },
  {
    title: "Hotel & Stay Benefits",
    description:
      "Luxury Hotel Nights – Redeem at Taj, Oberoi, Marriott, Hyatt properties worldwide. Resort Packages – All-inclusive stays in Maldives, Bali, and Thailand. Early Check-in / Late Checkout – Special privileges at partner hotels for cardholders.",
    imageName: rHotelStayBg,
  },
  {
    title: "Airport Privileges",
    description:
      "Lounge Access Boost – Extra complimentary visits for Priority Pass members. Meet & Assist Services – Concierge, fast-track immigration, baggage handling. Duty-Free Shopping – Redeem RPs at airport duty-free stores.",
    imageName: rAirportPrivilegesBg,
  },
  {
    title: "Experiences & Tours",
    description:
      "City Tours – Redeem for guided tours in top destinations. Cruise Packages – Luxury cruises in Singapore, Mediterranean, Alaska. Adventure Experiences – Hot air balloon rides, scuba diving, desert safaris.",
    imageName: rExperiencesToursBg,
  },
  {
    title: "Travel Utilities",
    description:
      "Visa & Travel Insurance – Redeem for visa fees or travel cover. Car Rentals & Transfers – Book Hertz, Avis, chauffeur services. Rail & Ferry Bookings – Redeem for EuroRail passes or island ferries.",
    imageName: rTravelUtilitiesBg,
  },
  {
    title: "Bonus Multiplier for Travelers",
    description:
      "5x RPs on flight bookings, 3x RPs on hotels & resorts, 2x RPs on international dining & duty-free shopping.",
    imageName: rBonusMultiplierBg,
  },
];
const privilegesSlides = [
  {
    title: "Live Without Limits",
    description:
      "UltimateCC is more than a travel card. It invites you to live without limits, explore without boundaries, and experience the world in unmatched style. Wherever your journey takes you, UltimateCC makes it extraordinary.",
    imageName: pStyleBg,
  },
  {
    title: "Luxury Hotel Partnerships",
    description:
      "Enjoy exclusive benefits at partner luxury hotels like Taj, Oberoi, Marriott, and Hyatt. From complimentary nights to room upgrades and late check-outs, your card ensures every stay is indulgent and memorable.",
    imageName: pHotelsBg,
  },
  {
    title: "Priority Event Access",
    description:
      "Get priority access to concerts, sporting events, and cultural festivals around the world. Experience front-row seating, VIP lounges, and premium hospitality packages as an UltimateCC cardholder.",
    imageName: pEventsBg,
  },
  {
    title: "24/7 Global Concierge",
    description:
      "Your personal concierge is available around the clock to help with travel bookings, restaurant reservations, event planning, and shopping assistance, anywhere in the world.",
    imageName: pConciergeBg,
  },
];

// --- COMPONENTS ---
function AccordionSectionUltimateCC({ label, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="ucc-accordion-wrapper">
      <button className="ucc-accordion-bar" onClick={() => setOpen(!open)}>
        <span className="ucc-accordion-plus">{open ? "–" : "+"}</span>
        <span className="ucc-accordion-label">{label}</span>
      </button>
      {open && (
        <div className="ucc-accordion-panel">
          {items.map((row, i) => (
            <div key={i} className="ucc-accordion-row">
              <div className="ucc-accordion-rowLabel">{row.charge}</div>
              <div className="ucc-accordion-rowDetail">{row.detail}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function UltimateCreditCard({ isSignedIn }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleApplyClick = () => {
    if (isSignedIn) {
      navigate("/apply");
    } else {
      navigate("/login");
    }
  };

  return (
    <div
      className={`ucc-card-container${hovered ? " ucc-card-hovered" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={creditCardImg}
        alt="Standard Chartered Ultimate Credit Card"
        className="ucc-card-image"
      />
      <button className="ucc-card-applyButton" onClick={handleApplyClick}>
        Apply Now
      </button>
    </div>
  );
}

// --- MODIFIED COMPONENT ---
function FeatureCardsCarousel() {
  const cards = [
    {
      title: "Online banking and SC Mobile",
      desc: "Check your card balance and make convenient and instant card payments via online banking and Standard Chartered Mobile.",
      icon: <MdPhoneIphone />,
    },
    {
      title: "Digital payment solutions",
      desc: "Enjoy a wide range of instant payment solutions like BharatQR, Bharat bill payment solution (BBPS) and Samsung Pay.",
      icon: <MdQrCode2 />,
    },
    {
      title: "Secure online transactions",
      desc: "Now enjoy enhanced security for online transactions on your credit card through 3D secure OTP verification.",
      icon: <MdSecurity />,
    },
    {
      title: "Contactless credit card",
      desc: "Enjoy faster checkouts, secure payments and complete freedom from cash, when you transact with a contactless credit card.",
      icon: <MdContactless />,
    },
    {
      title: "Supplementary Credit Cards",
      desc: "Extend the benefits of your credit card to your family members by getting them lifetime free Supplementary credit cards.",
      icon: <MdGroup />,
    },
    {
      title: "Balance on EMI",
      desc: "Convert your entire outstanding (upto INR 5,00,000) into EMIs. Zero processing fee.",
      icon: <MdDataSaverOn />,
    },
    {
      title: "Balance transfer",
      desc: "Transfer card balance upto INR 5,00,000 from other bank credit card at attractive interest rate.",
      icon: <MdSyncAlt />,
    },
    {
      title: "Dial-a-loan",
      desc: "Get loan on your credit card upto INR 5,00,000. Flexible tenure from 12 to 60 months.",
      icon: <MdPhoneInTalk />,
    },
    {
      title: "360° rewards",
      desc: "Redeem your reward points against our new online catalogue with the Standard Chartered 360° rewards program.",
      icon: <MdCardGiftcard />,
    },
    {
      title: "Kuch Bhi on EMI",
      desc: "Convert your big spends above INR 5,000 to easy EMI with Kuch Bhi on EMI through online banking or SC Mobile. Enjoy attractive pricing and flexible tenure options.",
      icon: <MdShoppingBasket />,
    },
  ];
  const scrollRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 0);
    setAtEnd(Math.ceil(el.scrollLeft + el.clientWidth) >= el.scrollWidth);
  };
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <div className="ucc-carousel-container">
      <h2 className="ucc-carousel-header">Features</h2>
      <div className="ucc-carousel-wrapper">
        {!atStart && (
          <button
            className="ucc-carousel-arrowButton ucc-carousel-arrowLeft"
            onClick={() => scroll("left")}
          >
            ‹
          </button>
        )}
        <div className="ucc-carousel-scrollArea" ref={scrollRef}>
          {cards.map((card, i) => (
            <div
              key={i}
              className="ucc-carousel-card"
              onMouseEnter={(e) => {
                e.currentTarget.classList.add("ucc-carousel-card-hover");
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove("ucc-carousel-card-hover");
              }}
            >
              <div className="ucc-carousel-icon-wrapper">{card.icon}</div>
              <h3 className="ucc-carousel-cardTitle">{card.title}</h3>
              <div className="ucc-carousel-cardDesc">{card.desc}</div>
            </div>
          ))}
        </div>
        {!atEnd && (
          <button
            className="ucc-carousel-arrowButton ucc-carousel-arrowRight"
            onClick={() => scroll("right")}
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
}

function CreditCardPage() {
  const { isSignedIn } = useOutletContext();
  const [currentRewardIndex, setCurrentRewardIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentRewardSlide, setCurrentRewardSlide] = useState(0);
  const [currentPrivilegeSlide, setCurrentPrivilegeSlide] = useState(0);
  const [sfAnimating, setSfAnimating] = useState(false);
  const [rewardAnimating, setRewardAnimating] = useState(false);
  const [privAnimating, setPrivAnimating] = useState(false);
  const menuItems = useMemo(
    () => [
      { id: "specialFeatures", label: "Special Features" },
      { id: "rewards", label: "Rewards" },
      { id: "privileges", label: "Privileges" },
    ],
    []
  );
  const goPrevFeatures = () => {
    if (sfAnimating) return;
    setSfAnimating(true);
    setCurrentSlide((prev) =>
      prev === 0 ? specialFeaturesSlides.length - 1 : prev - 1
    );
    setTimeout(() => setSfAnimating(false), 1000);
  };
  const goNextFeatures = () => {
    if (sfAnimating) return;
    setSfAnimating(true);
    setCurrentSlide((prev) =>
      prev === specialFeaturesSlides.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setSfAnimating(false), 1000);
  };
  const prevRewardSlide = () => {
    if (rewardAnimating) return;
    setRewardAnimating(true);
    setCurrentRewardSlide((prev) =>
      prev === 0 ? rewardsSlides.length - 1 : prev - 1
    );
    setTimeout(() => setRewardAnimating(false), 1000);
  };
  const nextRewardSlide = () => {
    if (rewardAnimating) return;
    setRewardAnimating(true);
    setCurrentRewardSlide((prev) =>
      prev === rewardsSlides.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setRewardAnimating(false), 1000);
  };
  const prevPrivilegeSlide = () => {
    if (privAnimating) return;
    setPrivAnimating(true);
    setCurrentPrivilegeSlide((prev) =>
      prev === 0 ? privilegesSlides.length - 1 : prev - 1
    );
    setTimeout(() => setPrivAnimating(false), 1000);
  };
  const nextPrivilegeSlide = () => {
    if (privAnimating) return;
    setPrivAnimating(true);
    setCurrentPrivilegeSlide((prev) =>
      prev === privilegesSlides.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setPrivAnimating(false), 1000);
  };
  const handleMenuClick = (id) => {
    setActiveMenu(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const targetY = el.getBoundingClientRect().top + window.scrollY - 100;
        const startY = window.scrollY;
        const diff = targetY - startY;
        const duration = 1200;
        let start;
        const easeInOutCubic = (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const elapsed = timestamp - start;
          const progress = Math.min(elapsed / duration, 1);
          window.scrollTo(0, startY + diff * easeInOutCubic(progress));
          if (elapsed < duration) {
            requestAnimationFrame(step);
          }
        };
        requestAnimationFrame(step);
      }
    }, 150);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRewardIndex(
        (prev) => (prev + 1) % rewardBenefitMessages.length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const onScroll = () => {
      for (let item of menuItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveMenu(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuItems]);

  return (
    <main className="ucc-page-container">
      <section className="ucc-content-card">
        <h1 className="ucc-page-title">
          Standard Chartered{" "}
          <span className="ucc-page-title-white">Ultimate Credit Card</span>
        </h1>
        <h4 className="ucc-page-subtitle">
          The Only Travel Credit Card You Will Ever Need.
        </h4>
        <div className="ucc-reward-banner">
          <img
            src={creditCardImg}
            alt="Ultimate Credit Card"
            className="ucc-banner-image"
          />
          <div className="ucc-banner-msg-container">
            <div
              className="ucc-banner-msg-slider"
              style={{
                transform: `translateX(-${currentRewardIndex * 100}%)`,
              }}
            >
              {rewardBenefitMessages.map((msg, i) => (
                <div key={i} className="ucc-banner-msg">
                  {msg}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ucc-benefits-flex">
          <UltimateCreditCard isSignedIn={isSignedIn} />{" "}
          <div className="ucc-benefits-list-container">
            <h2 className="ucc-benefits-title">Top Benefits</h2>
            <ul className="ucc-benefits-list">
              {benefits.map((b, i) => (
                <li key={i} className="ucc-benefits-item">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ucc-miniMenu-container">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`ucc-miniMenu-button${
                activeMenu === item.id ? " active" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        {/* Special Features Section */}
        <div id="specialFeatures">
          <h2 className="ucc-benefits-title">Special Features</h2>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              margin: "40px 0",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                width: `${specialFeaturesSlides.length * 100}%`,
                height: "100%",
                transform: `translateX(-${
                  currentSlide * (100 / specialFeaturesSlides.length)
                }%)`,
                transition: sfAnimating
                  ? "transform 1.0s cubic-bezier(0.25, 0.8, 0.25, 1)"
                  : "none",
              }}
            >
              {specialFeaturesSlides.map((slide, index) => (
                <div
                  key={index}
                  style={{
                    width: `${100 / specialFeaturesSlides.length}%`,
                    height: "100%",
                    display: "flex",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      backgroundImage: `url(${slide.imageName})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(0,0,0,0.55)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "32px",
                    }}
                  >
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={goPrevFeatures}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.35)",
                border: "none",
                color: "#fff",
                fontSize: "2rem",
                padding: "8px 14px",
                cursor: "pointer",
                borderRadius: "50%",
                zIndex: 1,
              }}
            >
              &#9664;
            </button>
            <button
              onClick={goNextFeatures}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.35)",
                border: "none",
                color: "#fff",
                fontSize: "2rem",
                padding: "8px 14px",
                cursor: "pointer",
                borderRadius: "50%",
                zIndex: 1,
              }}
            >
              &#9654;
            </button>
          </div>
        </div>
        {/* Rewards Section */}
        <div id="rewards">
          <h2 className="ucc-benefits-title">Rewards</h2>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              margin: "40px 0",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                width: `${rewardsSlides.length * 100}%`,
                height: "100%",
                transform: `translateX(-${
                  currentRewardSlide * (100 / rewardsSlides.length)
                }%)`,
                transition: rewardAnimating
                  ? "transform 1.0s cubic-bezier(0.25, 0.8, 0.25, 1)"
                  : "none",
              }}
            >
              {rewardsSlides.map((slide, index) => (
                <div
                  key={index}
                  style={{
                    width: `${100 / rewardsSlides.length}%`,
                    height: "100%",
                    display: "flex",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(0,0,0,0.55)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "32px",
                    }}
                  >
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      backgroundImage: `url(${slide.imageName})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              onClick={prevRewardSlide}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.35)",
                border: "none",
                color: "#fff",
                fontSize: "2rem",
                padding: "8px 14px",
                cursor: "pointer",
                borderRadius: "50%",
                zIndex: 1,
              }}
            >
              &#9664;
            </button>
            <button
              onClick={nextRewardSlide}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.35)",
                border: "none",
                color: "#fff",
                fontSize: "2rem",
                padding: "8px 14px",
                cursor: "pointer",
                borderRadius: "50%",
                zIndex: 1,
              }}
            >
              &#9654;
            </button>
          </div>
        </div>
        {/* Privileges Section */}
        <div id="privileges">
          <h2 className="ucc-benefits-title">Privileges</h2>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "400px",
              margin: "40px 0",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                width: `${privilegesSlides.length * 100}%`,
                height: "100%",
                transform: `translateX(-${
                  currentPrivilegeSlide * (100 / privilegesSlides.length)
                }%)`,
                transition: privAnimating
                  ? "transform 1.0s cubic-bezier(0.25, 0.8, 0.25, 1)"
                  : "none",
              }}
            >
              {privilegesSlides.map((slide, index) => (
                <div
                  key={index}
                  style={{
                    width: `${100 / privilegesSlides.length}%`,
                    height: "100%",
                    display: "flex",
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      backgroundImage: `url(${slide.imageName})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "rgba(0,0,0,0.55)",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "32px",
                    }}
                  >
                    <h3>{slide.title}</h3>
                    <p>{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={prevPrivilegeSlide}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.35)",
                border: "none",
                color: "#fff",
                fontSize: "2rem",
                padding: "8px 14px",
                cursor: "pointer",
                borderRadius: "50%",
                zIndex: 1,
              }}
            >
              &#9664;
            </button>
            <button
              onClick={nextPrivilegeSlide}
              style={{
                position: "absolute",
                right: 10,
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.35)",
                border: "none",
                color: "#fff",
                fontSize: "2rem",
                padding: "8px 14px",
                cursor: "pointer",
                borderRadius: "50%",
                zIndex: 1,
              }}
            >
              &#9654;
            </button>
          </div>
        </div>

        <FeatureCardsCarousel />
      </section>

      <AccordionSectionUltimateCC label="Fees and Charges" items={feesItems} />
      <AccordionSectionUltimateCC
        label="Eligibility"
        items={eligibilityItems}
      />
      <AccordionSectionUltimateCC label="Documents" items={documentItems} />
      <AccordionSectionUltimateCC label="Value Charts" items={valueChartRows} />
      <AccordionSectionUltimateCC
        label="Terms and Conditions"
        items={termsItems}
      />
    </main>
  );
}

export default CreditCardPage;
