// At the top of ParisPlatCreditCard.js
import React, { useState, useEffect, useRef, useMemo } from "react";
import "./ParisPlatCreditCard.css";
import { useNavigate, useOutletContext } from "react-router-dom";

// ------ IMAGE IMPORTS ------
// Import the main credit card image
import parisPlatCardImg from "./images/ParisPlat.png";

// Import images for the Special Features slider
import sfRewardPointsBg from "./images/special-features/reward_points_bg.jpg";
import sfCashbackDutyFreeBg from "./images/special-features/cashback_duty_free_bg.jpg";
import sfPriorityPassBg from "./images/special-features/priority_pass_bg.jpg";
import sfGolfPrivilegesBg from "./images/special-features/golf_privileges_bg.jpg";
import sfAirAccidentInsuranceBg from "./images/special-features/air_accident_insurance_bg.jpg";
import sfForexMarkupBg from "./images/special-features/forex_markup_bg.jpg";

// Import images for the Rewards slider
import rAirTravelRedemptionsBg from "./images/rewards/air_travel_redemptions_bg.jpg";
import rHotelStayBg from "./images/rewards/hotel_stay_bg.jpg";
import rAirportPrivilegesBg from "./images/rewards/airport_privileges_bg.jpg";
import rExperiencesToursBg from "./images/rewards/experiences_tours_bg.jpg";
import rTravelUtilitiesBg from "./images/rewards/travel_utilities_bg.jpg";
import rBonusMultiplierBg from "./images/rewards/bonus_multiplier_bg.jpg";

// Import images for the Privileges slider
import pStyleBg from "./images/privileges/ultimatecc_privileges_style_bg.jpg";
import pHotelsBg from "./images/privileges/ultimatecc_privileges_hotels_bg.jpg";
import pEventsBg from "./images/privileges/ultimatecc_privileges_events_bg.jpg";
import pConciergeBg from "./images/privileges/ultimatecc_privileges_concierge_bg.jpg";

// ------ REACT ICONS IMPORT ------
// Import the icons for the FeatureCardsCarousel
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

// ------ AccordionSection Component ------
const AccordionSection = ({ label, items }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="ppc-accordion-wrapper">
      <button className="ppc-accordion-bar" onClick={() => setOpen(!open)}>
        <span className="ppc-accordion-plus">{open ? "–" : "+"}</span>
        <span className="ppc-accordion-label">{label}</span>
      </button>

      {open && (
        <div className="ppc-accordion-panel">
          {items.map((row, i) => (
            <div key={i} className="ppc-accordion-row">
              <div className="ppc-accordion-row-label">{row.charge}</div>
              <div className="ppc-accordion-row-detail">{row.detail}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ------ CreditCard Component ------
const CreditCard = ({ isSignedIn }) => {
  const [cardHovered, setCardHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
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
      className={`ppc-credit-card-container ${cardHovered ? "hovered" : ""}`}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      <img
        src={parisPlatCardImg} // UPDATED: Using imported image
        alt="Standard Chartered Platinum Paris Edition Credit Card"
        className="ppc-credit-card-image"
      />
      <button
        className={`ppc-apply-button ${buttonHovered ? "hovered" : ""}`}
        onMouseEnter={() => setButtonHovered(true)}
        onMouseLeave={() => setButtonHovered(false)}
        onClick={handleApplyClick}
      >
        Apply Now
      </button>
    </div>
  );
};

// ------ FeatureCardsCarousel Component (MODIFIED) ------
const FeatureCardsCarousel = () => {
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
    if (el) {
      el.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => el.removeEventListener("scroll", handleScroll);
    }
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
    <div className="ppc-carousel-container">
      <h2 className="ppc-carousel-header">Features</h2>
      <div className="ppc-carousel-wrapper">
        {!atStart && (
          <button
            className="ppc-arrow-button left"
            onClick={() => scroll("left")}
          >
            ‹
          </button>
        )}
        <div className="ppc-scroll-area" ref={scrollRef}>
          {cards.map((card, i) => (
            <div key={i} className="ppc-carousel-card">
              <div className="ppc-carousel-icon-wrapper">{card.icon}</div>
              <h3 className="ppc-carousel-card-title">{card.title}</h3>
              <div className="ppc-carousel-card-desc">{card.desc}</div>
            </div>
          ))}
        </div>
        {!atEnd && (
          <button
            className="ppc-arrow-button right"
            onClick={() => scroll("right")}
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

// ------ CreditCardPage Component ------
const CreditCardPage = () => {
  const { isSignedIn } = useOutletContext();
  const [currentRewardIndex, setCurrentRewardIndex] = useState(0);
  const [activeMenu, setActiveMenu] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentRewardSlide, setCurrentRewardSlide] = useState(0);
  const [currentPrivilegeSlide, setCurrentPrivilegeSlide] = useState(0);
  const [sfAnimating, setSfAnimating] = useState(false);
  const [rewardAnimating, setRewardAnimating] = useState(false);
  const [privAnimating, setPrivAnimating] = useState(false);

  // ------ Data ------
  const benefits = [
    "10X Reward Points on dining at Michelin-starred restaurants worldwide",
    "5X Reward Points on luxury travel bookings and Paris experiences",
    "Complimentary Priority Pass for exclusive airport lounges globally",
    "Annual Fee: ₹15,000 + GST (Welcome: 15,000 reward points)",
    "Exclusive access to Paris Fashion Week events and VIP experiences",
  ];

  const rewardBenefitMessages = [
    "Earn 15,000 Reward Points* worth Rs. 15,000 on payment of joining fee with Platinum Paris Edition Credit Card.",
    "10X Reward Points on dining at Michelin-starred restaurants worldwide",
    "5X Reward Points on luxury travel bookings and Paris experiences",
    "Complimentary Priority Pass for exclusive airport lounges globally",
    "Annual Fee: ₹15,000 + GST (Welcome: 15,000 reward points)",
    "Exclusive access to Paris Fashion Week events and VIP experiences",
    "Air accident insurance worth ₹2 crore with premium travel protection",
    "Zero foreign exchange markup on international transactions",
    "Complimentary concierge service for Paris bookings and reservations",
    "Exclusive discounts at luxury boutiques on Champs-Élysées",
    "Priority access to Paris museums and cultural attractions",
  ];

  const feesItems = [
    { charge: "Joining fees", detail: "INR 15,000" },
    { charge: "Renewal fees", detail: "INR 15,000" },
    { charge: "Supplementary card – Joining fees", detail: "INR 5,000" },
    { charge: "Supplementary card – Renewal fees", detail: "INR 5,000" },
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
    {
      charge: "Annual Benefits of using Platinum Paris Edition Credit Card",
      detail: "",
    },
    {
      charge: "Exclusive Paris Fashion Week VIP access (INR 25,000 per event)",
      detail: "₹50,000",
    },
    {
      charge: "Michelin-starred dining experiences (INR 10,000 per meal)",
      detail: "₹30,000",
    },
    {
      charge:
        "Luxury Paris hotel stays with Priority Pass (INR 15,000 per night)",
      detail: "₹45,000",
    },
    {
      charge:
        "Exclusive shopping at Champs-Élysées boutiques (INR 5,000 cashback per visit)",
      detail: "₹15,000",
    },
    {
      charge: "Zero foreign exchange markup savings (INR 100,000 / Year)",
      detail: "₹2,000",
    },
    {
      charge: "Rewards points on luxury travel and dining (Premium categories)",
      detail: "",
    },
    {
      charge:
        "e.g., 1) avg INR 800,000/year 10X reward points on dining = ₹40,000 on Michelin restaurants",
      detail: "₹40,000",
    },
    {
      charge:
        "e.g., 2) avg INR 500,000/year 5X reward points on Paris experiences = ₹25,000 on luxury travel",
      detail: "₹25,000",
    },
    {
      charge:
        "Premium concierge service for Paris bookings (INR 3,000 per month)",
      detail: "₹36,000",
    },
    {
      charge:
        "Rewards points on paying joining fee (15,000 rewards points worth INR 15,000)",
      detail: "₹15,000",
    },
    { charge: "Total Benefits for Customer", detail: "₹257,000" },
    { detail: "For Illustration purposes only, Terms & Conditions apply*" },
  ];

  const termsItems = [
    {
      charge: "Platinum Paris Edition Credit Card – Terms & Conditions",
      detail: (
        <a
          href="https://av.sc.com/in/content/docs/in-platinum-paris-edition-credit-card-tnc.pdf"
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

  // --- UPDATED SLIDES DATA WITH IMPORTED IMAGES ---
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
      title: "Luxury Paris Travel Redemptions",
      description:
        "Free Business Class Flights to Paris – Redeem RPs for flights with Air France, Emirates, and Qatar Airways. Premium Hotel Stays – Part-pay or fully redeem for luxury Paris hotels. Business Class Upgrades – Use RPs to upgrade from Economy to Business on all Paris routes.",
      imageName: rAirTravelRedemptionsBg,
    },
    {
      title: "Exclusive Paris Hotel Benefits",
      description:
        "Luxury Paris Hotel Nights – Redeem at Ritz Paris, Four Seasons George V, Le Meurice, and Plaza Athénée. Château Stays – All-inclusive luxury stays in French countryside. Early Check-in / Late Checkout – Special privileges at all partner Paris hotels for cardholders.",
      imageName: rHotelStayBg,
    },
    {
      title: "Premium Paris Airport Privileges",
      description:
        "Exclusive Lounge Access – Unlimited visits to Priority Pass lounges worldwide. Meet & Assist Services – Personal concierge, fast-track immigration, luxury baggage handling. Duty-Free Shopping – Redeem RPs at exclusive Paris airport boutiques.",
      imageName: rAirportPrivilegesBg,
    },
    {
      title: "Paris Cultural Experiences & Tours",
      description:
        "Exclusive Paris Tours – VIP guided tours of Louvre, Eiffel Tower, and hidden gems. Fashion Week Access – Priority booking for Paris Fashion Week events. Luxury Experiences – Private wine tastings, haute couture fittings, and exclusive museum access.",
      imageName: rExperiencesToursBg,
    },
    {
      title: "Paris Travel Utilities",
      description:
        "Visa & Premium Travel Insurance – Redeem for Schengen visa fees or luxury travel cover. Luxury Car Rentals & Transfers – Book Rolls-Royce, Mercedes, and chauffeur services. Rail & Ferry Bookings – Redeem for TGV first-class passes or luxury river cruises.",
      imageName: rTravelUtilitiesBg,
    },
    {
      title: "Premium Multiplier for Paris Experiences",
      description:
        "10x RPs on Michelin dining, 5x RPs on luxury Paris hotels, 3x RPs on fashion shopping and cultural experiences.",
      imageName: rBonusMultiplierBg,
    },
  ];

  const privilegesSlides = [
    {
      title: "Parisian Elegance & Style",
      description:
        "Platinum Paris Edition is more than a credit card. It's your gateway to the sophisticated lifestyle of Paris, offering exclusive access to fashion shows, luxury boutiques, and cultural experiences that define French elegance.",
      imageName: pStyleBg,
    },
    {
      title: "Luxury Paris Hotel Partnerships",
      description:
        "Enjoy exclusive benefits at partner luxury hotels like Ritz Paris, Four Seasons George V, Le Meurice, and Plaza Athénée. From complimentary nights to room upgrades and late check-outs, your card ensures every Paris stay is indulgent and memorable.",
      imageName: pHotelsBg,
    },
    {
      title: "Exclusive Paris Event Access",
      description:
        "Get priority access to Paris Fashion Week, haute couture shows, and cultural festivals. Experience front-row seating, VIP lounges, and premium hospitality packages as a Platinum Paris Edition cardholder.",
      imageName: pEventsBg,
    },
    {
      title: "24/7 Paris Concierge Service",
      description:
        "Your personal Paris concierge is available around the clock to help with luxury travel bookings, Michelin restaurant reservations, fashion event planning, and exclusive shopping assistance in the heart of Paris.",
      imageName: pConciergeBg,
    },
  ];

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

  const menuItems = useMemo(
    () => [
      { id: "specialFeatures", label: "Special Features" },
      { id: "rewards", label: "Rewards" },
      { id: "privileges", label: "Privileges" },
    ],
    []
  );

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
  }, [rewardBenefitMessages.length]);

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
    <main className="ppc-page-container">
      <section className="ppc-content-card">
        <h1 className="ppc-page-title">
          Standard Chartered{" "}
          <span style={{ color: "#fff" }}>
            Platinum Paris Edition Credit Card
          </span>
        </h1>
        <h4 style={{ textAlign: "center" }}>
          Experience Luxury, Culture, and Elegance in the Heart of Paris.
        </h4>
        <div className="ppc-reward-banner">
          <img
            src={parisPlatCardImg} // UPDATED: Using imported image
            alt="Platinum Paris Edition Credit Card"
            className="ppc-banner-image"
          />
          <div style={{ overflow: "hidden", flex: 1 }}>
            <div
              style={{
                display: "flex",
                transition: "transform 0.6s ease",
                transform: `translateX(-${currentRewardIndex * 100}%)`,
              }}
            >
              {rewardBenefitMessages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: "100%",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {msg}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ppc-benefits-section">
          <CreditCard isSignedIn={isSignedIn} />
          <div className="ppc-benefits-details">
            <h2 className="ppc-benefits-title">Top Benefits</h2>
            <ul className="ppc-benefits-list">
              {benefits.map((b, i) => (
                <li key={i} className="ppc-benefits-item">
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="ppc-mini-menu-container">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`ppc-mini-menu-button ${
                activeMenu === item.id ? "active" : ""
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div id="specialFeatures">
          <h2 className="ppc-benefits-title">Special Features</h2>
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
        <div id="rewards">
          <h2 className="ppc-benefits-title">Rewards</h2>
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
        <div id="privileges">
          <h2 className="ppc-benefits-title">Privileges</h2>
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

      <div className="ppc-accordion-group-container">
        <AccordionSection label="Fees and Charges" items={feesItems} />
        <AccordionSection label="Eligibility" items={eligibilityItems} />
        <AccordionSection label="Documents" items={documentItems} />
        <AccordionSection label="Value Charts" items={valueChartRows} />
        <AccordionSection label="Terms and Conditions" items={termsItems} />
      </div>
    </main>
  );
};

export default CreditCardPage;
