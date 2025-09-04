import React, { useRef, useState, useEffect } from "react";
import "./EvergreenCreditCard.css";
import cardFront from "./assets/card-front.png";
import { useNavigate, useOutletContext } from "react-router-dom";

const navItems = [
  { id: "special-features", label: "Special Features" },
  { id: "rewards", label: "Rewards" },
  { id: "privileges", label: "Privileges" },
  { id: "eligibility", label: "Eligibility Criteria" },
];

// Navbar component
const Navbar = () => {
  const [activeTab, setActiveTab] = useState("special-features");
  const [hoveredTab, setHoveredTab] = useState(null);

  const handleTabClick = (id) => {
    setActiveTab(id);
    const section = document.getElementById(id);
    if (section) {
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = section.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      let currentSectionId = navItems[0].id;
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section && section.offsetTop <= scrollPosition) {
          currentSectionId = item.id;
        }
      }
      setActiveTab(currentSectionId);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="ecc-navbar-container">
      <div className="ecc-navbar">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`ecc-nav-item ${activeTab === item.id ? "active" : ""} ${
              hoveredTab === item.id ? "hovered" : ""
            }`}
            onClick={() => handleTabClick(item.id)}
            onMouseEnter={() => setHoveredTab(item.id)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <span className="ecc-nav-text">{item.label}</span>
            <div className="ecc-nav-indicator"></div>
            <div className="ecc-nav-glow"></div>
          </div>
        ))}
        <div
          className="ecc-active-background"
          style={{
            transform: `translateX(${
              navItems.findIndex((item) => item.id === activeTab) * 100
            }%)`,
          }}
        ></div>
      </div>
    </div>
  );
};

// SpecialFeatures component
function SpecialFeatures() {
  const benefits = [
    {
      key: "accelerated",
      label: "ACCELERATED EARN RATE",
      title: "Accelerated Earn Rate",
      description:
        "Earn faster with Evergreen Credit Card! Get extra rewards on eco-friendly spends like transport, organic shopping, and renewable energy bills. Every swipe brings you closer to bigger savings and a greener tomorrow.",
      icon: "⚡",
    },
    {
      key: "welcome",
      label: "WELCOME BONUS",
      title: "Welcome Bonus",
      description:
        "Start your Evergreen journey with a warm welcome! Enjoy bonus reward points on your first spend within 30 days of card activation. A greener lifestyle begins with instant rewards in your wallet.",
      icon: "🎁",
    },
    {
      key: "vouchers",
      label: "GIFT VOUCHERS",
      title: "Gift Vouchers",
      description:
        "Shop more, get rewarded! Earn exciting gift vouchers from leading eco-friendly and lifestyle brands on reaching milestone spends. Every purchase brings you closer to exclusive treats and sustainable rewards.",
      icon: "🎟️",
    },
    {
      key: "renewal",
      label: "RENEWAL FEE WAIVER",
      title: "Renewal Fee Waiver",
      description:
        "Keep saving year after year! Spend above the set annual threshold and get your next year's renewal fee completely waived. Enjoy Evergreen benefits without worrying about extra costs.",
      icon: "✅",
    },
  ];

  const [activeBenefit, setActiveBenefit] = useState(benefits[0]);

  return (
    <div className="ecc-special-features">
      <div className="ecc-container">
        <div className="ecc-header">
          <h2 className="ecc-main-title">Special Features</h2>
          <p className="ecc-subtitle">
            Eco-Friendly Benefits, Wallet-Friendly Fees.
          </p>
        </div>
        <div className="ecc-benefit-tabs">
          {benefits.map((benefit) => (
            <button
              key={benefit.key}
              className={`ecc-tab-button ${
                activeBenefit.key === benefit.key ? "active" : ""
              }`}
              onClick={() => setActiveBenefit(benefit)}
            >
              {benefit.label}
            </button>
          ))}
        </div>
        <div className="ecc-benefit-content">
          <div className="ecc-content-wrapper">
            <div className="ecc-icon-container">
              <div className="ecc-icon-wrapper">
                <span className="ecc-benefit-icon">{activeBenefit.icon}</span>
              </div>
            </div>
            <div className="ecc-text-content">
              <h3 className="ecc-benefit-title">{activeBenefit.title}</h3>
              <p className="ecc-benefit-description">
                {activeBenefit.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// RewardsSection component
const rewardsData = [
  {
    percentage: "5%",
    label: "Green Rewards",
    description:
      "On eco-friendly purchases like organic products, EV charging, and public transport.",
  },
  {
    percentage: "3%",
    label: "Cash Back",
    description: "On groceries, online food delivery, and utility bills.",
  },
  {
    percentage: "3%",
    label: "Eco-Bonus Points",
    description:
      "Redeem points for gift vouchers, sustainable products, or contribute to tree-planting programs.",
  },
  {
    percentage: "2%",
    label: "Reward Points",
    description: "Extra points on e-commerce platforms and digital payments.",
  },
  {
    percentage: "1%",
    label: "Universal Cashback",
    description: "On all other spends, no expectations.",
  },
];

function RewardsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const scrollContainerRef = useRef(null);
  const cardWidth = 320;

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollToIndex = (index) => {
    if (scrollContainerRef.current) {
      const scrollPosition = index * cardWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const maxIndex = rewardsData.length - 1;
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") scrollLeft();
      if (e.key === "ArrowRight") scrollRight();
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [currentIndex]);

  let startX = 0;
  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    e.preventDefault();
  };
  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) scrollRight();
      else scrollLeft();
    }
  };

  useEffect(() => {
    const handleScrollEvent = (e) => handleTouchMove(e);
    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("touchmove", handleScrollEvent);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("touchmove", handleScrollEvent);
      }
    };
  }, []);

  return (
    <section className="ecc-rewards-section">
      <h2 className="ecc-rewards-title">Earn Rewards</h2>
      <p className="ecc-rewards-subtitle">More Rewards More Savings</p>
      <div className="ecc-carousel-container">
        <div
          className="ecc-rewards-scroll-container"
          ref={scrollContainerRef}
          onScroll={updateScrollButtons}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="ecc-rewards-grid">
            {rewardsData.map((reward, index) => (
              <div className="ecc-reward-card" key={index}>
                <div className="ecc-percentage">{reward.percentage}</div>
                <div className="ecc-cashback-label">{reward.label}</div>
                <div className="ecc-reward-description">
                  {reward.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="ecc-scroll-controls">
          <button
            className={`ecc-scroll-btn ecc-scroll-btn-left ${
              !canScrollLeft ? "disabled" : ""
            }`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            className={`ecc-scroll-btn ecc-scroll-btn-right ${
              !canScrollRight ? "disabled" : ""
            }`}
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
        <div className="ecc-scroll-indicators">
          {rewardsData.map((_, index) => (
            <div
              key={index}
              className={`ecc-indicator ${
                index === currentIndex ? "active" : ""
              }`}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// PrivilegesCards component
const PrivilegesCards = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const privilegesData = [
    {
      id: 1,
      title: "Exclusive Green Deals",
      image:
        "https://plus.unsplash.com/premium_photo-1678865184137-84edf9a631c7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      details:
        "Special discounts on eco-friendly brands, sustainable fashion, and renewable energy services.",
    },
    {
      id: 2,
      title: "Grocery Offers",
      image:
        "https://plus.unsplash.com/premium_photo-1686308724969-67009d85da5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      details:
        "Exclusive discounts with partner platforms for agri-products and machinery.",
    },
    {
      id: 3,
      title: "Airport Lounge Access",
      image:
        "https://media.istockphoto.com/id/1413396562/photo/asian-young-businesswomen-at-the-airport.jpg?s=612x612&w=is&k=20&c=OFreBc_IFVOAx-DSRZq3aFENb3i6QN5ZNqIIbT1EcQ4=",
      details:
        "Relax in comfort with complimentary domestic airport lounge visits.",
    },
    {
      id: 4,
      title: "Global Acceptance",
      image:
        "https://plus.unsplash.com/premium_photo-1740533182121-1d7489376752?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      details:
        "Use your card seamlessly worldwide with 24x7 customer care assistance.",
    },
  ];

  const toggleFlipped = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="ecc-privileges-container">
      <div className="ecc-privileges-header">
        <h2 className="ecc-privileges-title">Privileges</h2>
        <p className="ecc-privileges-subtitle">
          Exclusive privileges for Premium customers...
        </p>
      </div>
      <div className="ecc-privileges-grid">
        {privilegesData.map((privilege) => (
          <div key={privilege.id} className="ecc-privilege-card">
            <div
              className={`ecc-card-inner ${
                flippedCards[privilege.id] ? "flipped" : ""
              }`}
            >
              <div className="ecc-card-front">
                <div className="ecc-card-image-container">
                  <img
                    src={privilege.image}
                    alt={privilege.title}
                    className="ecc-card-image"
                  />
                  <div className="ecc-image-overlay"></div>
                </div>
                <div className="ecc-card-content">
                  <h3 className="ecc-card-title">{privilege.title}</h3>
                  <button
                    onClick={() => toggleFlipped(privilege.id)}
                    className="ecc-expand-button"
                  >
                    <span className="ecc-expand-icon">+</span>
                  </button>
                </div>
              </div>
              <div className="ecc-card-back">
                <div className="ecc-card-content">
                  <h3 className="ecc-card-title">{privilege.title}</h3>
                  <div className="ecc-card-details">
                    <p className="ecc-details-text">{privilege.details}</p>
                  </div>
                  <button
                    onClick={() => toggleFlipped(privilege.id)}
                    className="ecc-close-button"
                  >
                    <span className="ecc-expand-icon">✖</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ExpandableSections component
const ExpandableSections = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="ecc-expandable-container">
      <h2 className="ecc-expandable-title">Eligibility Criteria</h2>
      <p className="ecc-expandable-subtitle">Evergreen Card - Check & Apply</p>
      <div className="ecc-expandable-section">
        <div
          className="ecc-section-header"
          onClick={() => toggleSection("eligibility")}
        >
          <span>Eligibility Criteria & Documentation</span>
          <span
            className={`ecc-arrow ${
              expandedSection === "eligibility" ? "expanded" : ""
            }`}
          ></span>
        </div>
        {expandedSection === "eligibility" && (
          <div className="ecc-section-content">
            <div className="ecc-content-grid">
              <div className="ecc-eligibility-column">
                <h4>Eligibility Criteria</h4>
                <ul>
                  <li>Age: 21 to 60 years</li>
                  <li>Minimum annual income: ₹6 Lakhs</li>
                  <li>Good credit score (750+)</li>
                  <li>Salaried or self-employed</li>
                  <li>Resident Indian</li>
                </ul>
              </div>
              <div className="ecc-documentation-column">
                <h4>Required Documents</h4>
                <ul>
                  <li>Identity Proof (Aadhaar/PAN/Passport)</li>
                  <li>Address Proof (Utility Bill/Rent Agreement)</li>
                  <li>Income Proof (Salary Slips/ITR/Bank Statements)</li>
                  <li>Passport size photographs</li>
                  <li>Employment/Business Proof</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="ecc-expandable-section">
        <div
          className="ecc-section-header"
          onClick={() => toggleSection("fees")}
        >
          <span>Fees & Charges</span>
          <span
            className={`ecc-arrow ${
              expandedSection === "fees" ? "expanded" : ""
            }`}
          ></span>
        </div>
        {expandedSection === "fees" && (
          <div className="ecc-section-content">
            <div className="ecc-fees-table">
              <div className="ecc-fee-row">
                <span className="ecc-fee-type">Joining Fee</span>
                <span className="ecc-fee-amount">₹0 + GST</span>
              </div>
              <div className="ecc-fee-row">
                <span className="ecc-fee-type">Annual Fee</span>
                <span className="ecc-fee-amount">₹499 + GST</span>
              </div>
              <div className="ecc-fee-row">
                <span className="ecc-fee-type">Cash Advance Fee</span>
                <span className="ecc-fee-amount">
                  2.5% of transaction amount
                </span>
              </div>
              <div className="ecc-fee-row">
                <span className="ecc-fee-type">Late Payment Fee</span>
                <span className="ecc-fee-amount">Up to ₹500</span>
              </div>
              <div className="ecc-fee-row">
                <span className="ecc-fee-type">Over Limit Fee</span>
                <span className="ecc-fee-amount">
                  2.5% of over limit amount
                </span>
              </div>
              <div className="ecc-fee-row">
                <span className="ecc-fee-type">Foreign Currency Markup</span>
                <span className="ecc-fee-amount">
                  3.5% of transaction amount
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="ecc-expandable-section">
        <div
          className="ecc-section-header"
          onClick={() => toggleSection("faq")}
        >
          <span>FAQ</span>
          <span
            className={`ecc-arrow ${
              expandedSection === "faq" ? "expanded" : ""
            }`}
          ></span>
        </div>
        {expandedSection === "faq" && (
          <div className="ecc-section-content">
            <div className="ecc-faq-list">
              <div className="ecc-faq-item">
                <h4>What should I do if my card is lost or stolen?</h4>
                <p>
                  Contact the Standard Chartered customer care helpline
                  immediately to block the card and request a replacement.
                </p>
              </div>
              <div className="ecc-faq-item">
                <h4>What are the milestone benefits?</h4>
                <p>
                  Milestone benefits are special rewards you receive when you
                  reach certain spending thresholds in a year, such as ₹3 lakhs,
                  ₹7.5 lakhs, and ₹15 lakhs.
                </p>
              </div>
              <div className="ecc-faq-item">
                <h4>How do I upgrade to higher tiers?</h4>
                <p>
                  Tier upgrades are automatic based on your annual spending.
                  Spend more to unlock better benefits and higher tier status.
                </p>
              </div>
              <div className="ecc-faq-item">
                <h4>Are there any foreign transaction fees?</h4>
                <p>
                  Yes, foreign currency transactions incur a markup fee of 3.5%
                  of the transaction amount.
                </p>
              </div>
              <div className="ecc-faq-item">
                <h4>How can I redeem my reward points?</h4>
                <p>
                  Reward points can be redeemed for flights, hotels,
                  merchandise, or statement credits through the SC online
                  banking or SC mobile app.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
function EvergreenCreditCard() {
  const navigate = useNavigate();
  const { isSignedIn } = useOutletContext();

  const handleApplyClick = () => {
    if (isSignedIn) {
      navigate("/apply");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <a href="/" className="ecc-home-button">
        Home
      </a>
      <div className="ecc-card-benefits-container">
        <div className="ecc-title">
          Standard Chartered EverGreen Credit Card
        </div>
        <div className="ecc-card-benefits">
          <div className="ecc-card-display">
            <img src={cardFront} alt="Credit Card" />
            <button className="ecc-apply-btn" onClick={handleApplyClick}>
              Apply Now
            </button>
          </div>
          <div className="ecc-top-benefits">
            <h2>Top Benefits</h2>
            <ul>
              <li>Eco-Friendly</li>
              <li>Zero Joining Fee & Low Annual Fee</li>
              <li>Green Cashback on Everyday Spends</li>
              <li>Tree Planting & Carbon Offset Program</li>
              <li>Exclusive Partner Discounts</li>
            </ul>
          </div>
        </div>
      </div>
      <Navbar />
      <section id="special-features" className="ecc-section">
        <SpecialFeatures />
      </section>
      <section id="rewards" className="ecc-section">
        <RewardsSection />
      </section>
      <section id="privileges" className="ecc-section">
        <PrivilegesCards />
      </section>
      <section id="eligibility" className="ecc-section">
        <ExpandableSections />
      </section>
    </div>
  );
}

export default EvergreenCreditCard;
