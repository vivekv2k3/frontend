import React, { useRef, useState, useEffect } from "react";
import "./BreezeCreditCard.css";
import cardFront from "./assets/card-front.png";
import { useNavigate, useOutletContext } from "react-router-dom";

const navItems = [
  { id: "special-features", label: "Special Features" },
  { id: "rewards", label: "Rewards" },
  { id: "privileges", label: "Privileges" },
  { id: "eligibility", label: "Eligibility Criteria" },
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("special-features");
  const [hoveredTab, setHoveredTab] = useState(null);

  const handleTabClick = (id) => {
    setActiveTab(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const section = document.getElementById(navItems[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bcc-navbar-container">
      <div className="bcc-navbar">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`bcc-nav-item ${activeTab === item.id ? "active" : ""} ${
              hoveredTab === item.id ? "hovered" : ""
            }`}
            onClick={() => handleTabClick(item.id)}
            onMouseEnter={() => setHoveredTab(item.id)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <span className="bcc-nav-text">{item.label}</span>
            <div className="bcc-nav-indicator"></div>
            <div className="bcc-nav-glow"></div>
          </div>
        ))}
        <div
          className="bcc-active-background"
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

function SpecialFeatures() {
  const benefits = [
    {
      key: "accelerated",
      label: "ACCELERATED EARN RATE",
      title: "Accelerated Earn Rate",
      description:
        "Boost your rewards with accelerated membership reward points when you shop, travel, dine, or book entertainment with top partners like Amazon, Flipkart, Uber, BookMyShow, Zomato, EaseMyTrip, and more.",
      icon: "⚡",
    },
    {
      key: "welcome",
      label: "WELCOME BONUS",
      title: "Welcome Bonus",
      description: (
        <>
          {" "}
          Kickstart your card journey with ₹500 cashback when you make eligible
          purchase worth ₹10,000 or more within the first 90 days of your Card
          membership.{" "}
        </>
      ),
      icon: "🎁",
    },
    {
      key: "vouchers",
      label: "GIFT VOUCHERS",
      title: "Gift Vouchers",
      description: (
        <>
          {" "}
          Earn vouchers worth ₹500 each upon reaching spend milestones of ₹1.20
          lakh, ₹1.80 lakh, and ₹2.40 lakh during a card membership year.{" "}
        </>
      ),
      icon: "🎟️",
    },
    {
      key: "renewal",
      label: "RENEWAL FEE WAIVER",
      title: "Renewal Fee Waiver",
      description: (
        <>
          {" "}
          Spend ₹40,000 or more in the previous card membership year and enjoy a
          renewal fee waiver.{" "}
        </>
      ),
      icon: "✅",
    },
  ];

  const [activeBenefit, setActiveBenefit] = useState(benefits[0]);

  return (
    <div className="bcc-special-features">
      <div className="bcc-container">
        <div className="bcc-header">
          <h2 className="bcc-main-title">Special Features</h2>
          <p className="bcc-subtitle">
            {" "}
            From groceries to gateways, the Breeze Credit Card fits seamlessly
            into your Everyday spends.{" "}
          </p>
        </div>
        <div className="bcc-benefit-tabs">
          {benefits.map((benefit) => (
            <button
              key={benefit.key}
              className={`bcc-tab-button ${
                activeBenefit.key === benefit.key ? "active" : ""
              }`}
              onClick={() => setActiveBenefit(benefit)}
            >
              {benefit.label}
            </button>
          ))}
        </div>
        <div className="bcc-benefit-content">
          <div className="bcc-content-wrapper">
            <div className="bcc-icon-container">
              <div className="bcc-icon-wrapper">
                <span className="bcc-benefit-icon">{activeBenefit.icon}</span>
              </div>
            </div>
            <div className="bcc-text-content">
              <h3 className="bcc-benefit-title">{activeBenefit.title}</h3>
              <p className="bcc-benefit-description">
                {activeBenefit.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const rewardsData = [
  {
    percentage: "3%",
    label: "Cash Back",
    description:
      "On groceries at leading supermarkets across India, on spends up to ₹2,00,000 per year.",
  },
  {
    percentage: "3%",
    label: "Cash Back",
    description:
      "On online shopping at top Indian platforms like Amazon, Flipkart, Myntra, and more up to 12,00,000 per year.",
  },
  {
    percentage: "3%",
    label: "Cash Back",
    description:
      "On fuel spends at major petrol pumps across India, on spends up to 14,00,000 per year.",
  },
  {
    percentage: "5%",
    label: "Cash Back",
    description:
      "On dining at premium restaurants and food delivery apps like Zomato, Swiggy up to 1,50,000 per year.",
  },
  {
    percentage: "2%",
    label: "Reward Points",
    description:
      "On utility bills including electricity, gas, water, and telecom payments with no upper limit.",
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
    const scrollElement = scrollContainerRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("touchmove", handleTouchMove);
      scrollElement.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("touchmove", handleTouchMove);
        scrollElement.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, []);

  return (
    <section className="bcc-rewards-section">
      <h2 className="bcc-rewards-title">Earn Rewards</h2>
      <p className="bcc-rewards-subtitle">
        Maximize your benefits with every spend
      </p>
      <div className="bcc-carousel-container">
        <div
          className="bcc-rewards-scroll-container"
          ref={scrollContainerRef}
          onScroll={updateScrollButtons}
          onTouchStart={handleTouchStart}
        >
          <div className="bcc-rewards-grid">
            {rewardsData.map((reward, index) => (
              <div className="bcc-reward-card" key={index}>
                <div className="bcc-percentage">{reward.percentage}</div>
                <div className="bcc-cashback-label">{reward.label}</div>
                <div className="bcc-reward-description">
                  {reward.description}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bcc-scroll-controls">
          <button
            className={`bcc-scroll-btn bcc-scroll-btn-left ${
              !canScrollLeft ? "disabled" : ""
            }`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            className={`bcc-scroll-btn bcc-scroll-btn-right ${
              !canScrollRight ? "disabled" : ""
            }`}
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
        <div className="bcc-scroll-indicators">
          {rewardsData.map((_, index) => (
            <div
              key={index}
              className={`bcc-indicator ${
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

const PrivilegesCards = () => {
  const [flippedCards, setFlippedCards] = useState({});
  const privilegesData = [
    {
      id: 1,
      title: "Cash Back",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      details:
        "Shop now and conveniently use cash back at checkout at Amazon.com. Your cash back has the same value at Amazon checkout as it does if you redeem as a statement credit.",
    },
    {
      id: 2,
      title: "Send & Split",
      image:
        "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=400&h=250&fit=crop",
      details:
        "Send money or split purchases seamlessly with any phone pay user. Enroll today and enjoy fast, secure, and convenient payments.",
    },
    {
      id: 3,
      title: "Travel Benefits",
      image:
        "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=250&fit=crop",
      details:
        "Access exclusive airport lounges, priority boarding, and complimentary upgrades. Enjoy travel insurance coverage and 24/7 concierge services for all your travel needs.",
    },
    {
      id: 4,
      title: "Dining Rewards",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop",
      details:
        "Earn extra points at participating restaurants and get access to exclusive dining experiences. Reserve tables at top restaurants and enjoy complimentary appetizers or desserts.",
    },
  ];

  const toggleFlipped = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="bcc-privileges-container">
      <div className="bcc-privileges-header">
        <h2 className="bcc-privileges-title">Privileges</h2>
        <p className="bcc-privileges-subtitle">
          Exclusive privileges for Premium customers...
        </p>
      </div>
      <div className="bcc-privileges-grid">
        {privilegesData.map((privilege) => (
          <div key={privilege.id} className="bcc-privilege-card">
            <div
              className={`bcc-card-inner ${
                flippedCards[privilege.id] ? "flipped" : ""
              }`}
            >
              <div className="bcc-card-front">
                <div className="bcc-card-image-container">
                  <img
                    src={privilege.image}
                    alt={privilege.title}
                    className="bcc-card-image"
                  />
                  <div className="bcc-image-overlay"></div>
                </div>
                <div className="bcc-card-content">
                  <h3 className="bcc-card-title">{privilege.title}</h3>
                  <button
                    onClick={() => toggleFlipped(privilege.id)}
                    className="bcc-expand-button"
                  >
                    <span className="bcc-expand-icon">+</span>
                  </button>
                </div>
              </div>
              <div className="bcc-card-back">
                <div className="bcc-card-content">
                  <h3 className="bcc-card-title">{privilege.title}</h3>
                  <div className="bcc-card-details">
                    <p className="bcc-details-text">{privilege.details}</p>
                  </div>
                  <button
                    onClick={() => toggleFlipped(privilege.id)}
                    className="bcc-close-button"
                  >
                    <span className="bcc-expand-icon">✖</span>
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

const ExpandableSections = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="bcc-expandable-container">
      <h2 className="bcc-expandable-title">Eligibility Criteria</h2>
      <p className="bcc-expandable-subtitle">Breeze Card - Check & Apply</p>
      <div className="bcc-expandable-section">
        <div
          className="bcc-section-header"
          onClick={() => toggleSection("eligibility")}
        >
          <span>Eligibility Criteria & Documentation</span>
          <span
            className={`bcc-arrow ${
              expandedSection === "eligibility" ? "expanded" : ""
            }`}
          ></span>
        </div>
        {expandedSection === "eligibility" && (
          <div className="bcc-section-content">
            <div className="bcc-content-grid">
              <div className="bcc-eligibility-column">
                <h4>Eligibility Criteria</h4>
                <ul>
                  <li>Age: 21 to 60 years</li>
                  <li>Minimum annual income: ₹6 Lakhs</li>
                  <li>Good credit score (750+)</li>
                  <li>Salaried or self-employed</li>
                  <li>Resident Indian</li>
                </ul>
              </div>
              <div className="bcc-documentation-column">
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
      <div className="bcc-expandable-section">
        <div
          className="bcc-section-header"
          onClick={() => toggleSection("fees")}
        >
          <span>Fees & Charges</span>
          <span
            className={`bcc-arrow ${
              expandedSection === "fees" ? "expanded" : ""
            }`}
          ></span>
        </div>
        {expandedSection === "fees" && (
          <div className="bcc-section-content">
            <div className="bcc-fees-table">
              <div className="bcc-fee-row">
                <span className="bcc-fee-type">Joining Fee</span>
                <span className="bcc-fee-amount">₹5,000 + GST</span>
              </div>
              <div className="bcc-fee-row">
                <span className="bcc-fee-type">Annual Fee</span>
                <span className="bcc-fee-amount">₹5,000 + GST</span>
              </div>
              <div className="bcc-fee-row">
                <span className="bcc-fee-type">Cash Advance Fee</span>
                <span className="bcc-fee-amount">
                  2.5% of transaction amount
                </span>
              </div>
              <div className="bcc-fee-row">
                <span className="bcc-fee-type">Late Payment Fee</span>
                <span className="bcc-fee-amount">Up to ₹1,300</span>
              </div>
              <div className="bcc-fee-row">
                <span className="bcc-fee-type">Over Limit Fee</span>
                <span className="bcc-fee-amount">
                  2.5% of over limit amount
                </span>
              </div>
              <div className="bcc-fee-row">
                <span className="bcc-fee-type">Foreign Currency Markup</span>
                <span className="bcc-fee-amount">
                  3.5% of transaction amount
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="bcc-expandable-section">
        <div
          className="bcc-section-header"
          onClick={() => toggleSection("faq")}
        >
          <span>FAQ</span>
          <span
            className={`bcc-arrow ${
              expandedSection === "faq" ? "expanded" : ""
            }`}
          ></span>
        </div>
        {expandedSection === "faq" && (
          <div className="bcc-section-content">
            <div className="bcc-faq-list">
              <div className="bcc-faq-item">
                <h4>What should I do if my card is lost or stolen?</h4>
                <p>
                  Contact the Standard Chartered customer care helpline
                  immediately to block the card and request a replacement.
                </p>
              </div>
              <div className="bcc-faq-item">
                <h4>What are the milestone benefits?</h4>
                <p>
                  Milestone benefits are special rewards you receive when you
                  reach certain spending thresholds in a year, such as ₹3 lakhs,
                  ₹7.5 lakhs, and ₹15 lakhs.
                </p>
              </div>
              <div className="bcc-faq-item">
                <h4>How do I upgrade to higher tiers?</h4>
                <p>
                  Tier upgrades are automatic based on your annual spending.
                  Spend more to unlock better benefits and higher tier status.
                </p>
              </div>
              <div className="bcc-faq-item">
                <h4>Are there any foreign transaction fees?</h4>
                <p>
                  Yes, foreign currency transactions incur a markup fee of 3.5%
                  of the transaction amount.
                </p>
              </div>
              <div className="bcc-faq-item">
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

function BreezeCreditCard() {
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
      <a href="/" className="bcc-home-button">
        Home
      </a>
      <div className="bcc-card-benefits-container">
        <div className="bcc-title">Standard Chartered Breeze Credit Card</div>
        <div className="bcc-card-benefits">
          <div className="bcc-card-display">
            <img src={cardFront} alt="Credit Card" />
            <button className="bcc-apply-btn" onClick={handleApplyClick}>
              Apply Now
            </button>
          </div>
          <div className="bcc-top-benefits">
            <h2>Top Benefits</h2>
            <ul>
              <li>5% Cashback on Travel</li>
              <li>Complimentary Lounge Access</li>
              <li>Reward Points on Every Spend</li>
              <li>Low Foreign Transaction Fee</li>
              <li>Insurance Coverage up to 1 Crore</li>
            </ul>
          </div>
        </div>
      </div>
      <Navbar />
      <section id="special-features" className="bcc-section">
        <SpecialFeatures />
      </section>
      <section id="rewards" className="bcc-section">
        <RewardsSection />
      </section>
      <section id="privileges" className="bcc-section">
        <PrivilegesCards />
      </section>
      <section id="eligibility" className="bcc-section">
        <ExpandableSections />
      </section>
    </div>
  );
}

export default BreezeCreditCard;
