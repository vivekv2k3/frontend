import React, { useState, useEffect, useRef } from "react";
import "./theme.css";
import logo from "./images/logo.png";
import paris from "./images/ParisPlatCC.png";
import breeze from "./images/BreezeCC.png";
import evergreen from "./images/EvergreenCC.png";
import UltimateCard from "./images/UltimateCC.png";
import { useNavigate } from 'react-router-dom';

const heroCards = [
  {
    img: UltimateCard,
    name: "Ultimate",
    id: "ultimate", // Add ID
    description: "The premium black card for exclusive privileges.",
    category: "Premium",
    features: [
      "Unlimited Lounge Access",
      "Golf Benefits",
      "Concierge Service",
      "Travel Insurance",
    ],
    annualFee: "₹50,000",
    rewardRate: "5X Points",
  },
  {
    img: paris,
    name: "Platinum Paris Edition",
    id: "paris",
    description: "Hot Selling | Premium Lifestyle Offers",
    category: "Lifestyle",
    features: [
      "Lounge Access",
      "Golf Rounds",
      "BookMyShow Offers",
      "Dining Benefits",
    ],
    annualFee: "₹25,000",
    rewardRate: "3X Points",
  },
  {
    img: breeze,
    name: "Breeze",
    id: "breeze",
    description: "Exclusive Rewards | High-End Lifestyle Perks",
    category: "Travel",
    features: [
      "Welcome Vouchers",
      "Golf Rounds",
      "Lounge Access",
      "Travel Benefits",
    ],
    annualFee: "₹15,000",
    rewardRate: "2X Points",
  },
  {
    img: evergreen,
    name: "Evergreen",
    id: "evergreen",
    description: "Popular | Everyday or On-The-Go Spends",
    category: "Low Fee",
    features: ["Lounge Access", "BookMyShow Offers", "INOX Offers", "Cashback"],
    annualFee: "₹5,000",
    rewardRate: "1X Points",
  },
];

// ...existing code...
const cards = [
  {
    img: UltimateCard,
    name: "Ultimate",
    id: "ultimate",
    label: "Premium",
    labelColor: "#22c55e",
    bestFor: "Exclusive Privileges",
    details: "Unlimited Lounge Access | Concierge Service | Golf Benefits",
    // more: "more",
    category: "Premium",
    features: [
      "Unlimited Lounge Access",
      "Golf Benefits",
      "Concierge Service",
      "Travel Insurance",
    ],
    annualFee: "₹50,000",
    rewardRate: "5X Points",
  },
  {
    img: paris,
    name: "Platinum Paris Edition",
    id: "paris",
    label: "Hot Selling",
    labelColor: "#22c55e",
    bestFor: "Premium Lifestyle Offers",
    details: "Lounge Access | Golf Rounds | BookMyShow Offers",
    // more: "more",
    category: "Lifestyle",
    features: [
      "Lounge Access",
      "Golf Rounds",
      "BookMyShow Offers",
      "Dining Benefits",
    ],
    annualFee: "₹25,000",
    rewardRate: "3X Points",
  },
  {
    img: breeze,
    name: "Breeze",
    id: "breeze",
    label: "Exclusive Rewards",
    labelColor: "#22c55e",
    bestFor: "High-End Lifestyle Perks",
    details: "Welcome vouchers | Complimentary Golf rounds | Lounge access",
    // more: "more",
    category: "Travel",
    features: [
      "Welcome Vouchers",
      "Golf Rounds",
      "Lounge Access",
      "Travel Benefits",
    ],
    annualFee: "₹15,000",
    rewardRate: "2X Points",
  },
  {
    img: evergreen,
    name: "Evergreen",
    id: "evergreen",
    label: "Popular",
    labelColor: "#22c55e",
    bestFor: "Everyday or On-The-Go Spends",
    details: "Lounge access | BookMyShow offers | INOX offers",
    // more: "more",
    category: "Low Fee",
    features: ["Lounge Access", "BookMyShow Offers", "INOX Offers", "Cashback"],
    annualFee: "₹5,000",
    rewardRate: "1X Points",
  },
];

const allCards = [
  ...cards
];

// Statistics data
const statisticsData = [
  {
    targetNumber: 3000000,
    suffix: "M+",
    label: "Cards Issued",
    icon: "💳"
  },
  {
    targetNumber: 200,
    suffix: "+",
    label: "Lounge Partners",
    icon: "✈️"
  },
  {
    targetNumber: 99.9,
    suffix: "%",
    label: "Fraud Protection",
    icon: "🔒"
  },
  {
    targetNumber: 60,
    suffix: "+",
    label: "Countries",
    icon: "🌍"
  }
];

function Homepage() {
  const [current, setCurrent] = useState(0);
  const [prevCard, setPrevCard] = useState(heroCards.length - 1);
  //const timeoutRef = useRef();

  // Animation states
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showContainer, setShowContainer] = useState(false);
  const [showWhySection, setShowWhySection] = useState(false);
  const [showStatsSection, setShowStatsSection] = useState(false);
  const [hasTriggeredStats, setHasTriggeredStats] = useState(false);

  // Statistics animation states
  const [statNumbers, setStatNumbers] = useState([0, 0, 0, 0]);
  const [statsAnimationStarted, setStatsAnimationStarted] = useState(false);

  // New states for enhanced features
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [compareCards, setCompareCards] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showCompareSelector, setShowCompareSelector] = useState(false);

  const cardsContainerRef = useRef(null);
  const containerRef = useRef(null);
  const whySectionRef = useRef(null);
  const heroRef = useRef(null);
  const statsSectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  // Homepage.js

  const handleCardDetails = (cardId) => {
    navigate(`/cards/${cardId}-details`);
  };

  const handleApply = () => {
    navigate("/apply");
  };
  useEffect(() => {
    // This triggers the animation shortly after the component is ready
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top on component mount/refresh
  useEffect(() => {
    // Disable scroll restoration using the newer API
    if (
      typeof window !== "undefined" &&
      window.history &&
      window.history.scrollRestoration
    ) {
      window.history.scrollRestoration = "manual";
    }

    // Scroll to top immediately
    window.scrollTo(0, 0);

    // Also set it with a small delay to ensure it works
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Mouse movement tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Loading animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    const timer2 = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Auto-scroll effect for carousel
  useEffect(() => {
    if (!showContent) return;

    const timer = setTimeout(() => {
      const nextIdx = (current + 1) % heroCards.length;
      setPrevCard(current);
      setCurrent(nextIdx);
    }, 4000);

    return () => clearTimeout(timer);
  }, [current, showContent]);

  // Statistics animation effect - only runs once
  useEffect(() => {
    if (!showStatsSection || statsAnimationStarted) return;

    setStatsAnimationStarted(true);

    // Animate each statistic with different durations
    statisticsData.forEach((stat, index) => {
      let startTime = null;
      const duration = 2500 + index * 200;

      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const progressRatio = Math.min(progress / duration, 1);

        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progressRatio, 3);
        const current = stat.targetNumber * easeOut;

        setStatNumbers((prev) => {
          const newNumbers = [...prev];
          newNumbers[index] = current;
          return newNumbers;
        });

        if (progressRatio < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    });
  }, [showStatsSection, statsAnimationStarted]);

  // Manual scroll for carousel
  const handleDotClick = (idx) => {
    if (idx === current) return;
    setPrevCard(current);
    setCurrent(idx);
  };

  // Filter functions
  const filterOptions = ["All", "Lifestyle", "Travel", "Premium", "Low Fee"];

  const filteredCards =
    selectedFilter === "All"
      ? cards
      : cards.filter((card) => card.category === selectedFilter);

  // Comparison functions
  const toggleCompareCard = (card) => {
    setCompareCards((prev) => {
      const isAlreadySelected = prev.find((c) => c.name === card.name);
      if (isAlreadySelected) {
        return prev.filter((c) => c.name !== card.name);
      } else if (prev.length < 3) {
        return [...prev, card];
      }
      return prev;
    });
  };

  const clearComparison = () => {
    setCompareCards([]);
    setShowComparison(false);
    setShowCompareSelector(false);
  };

  const openCompareSelector = () => {
    setShowCompareSelector(true);
  };

  // Format number for display
  const formatNumber = (num, suffix) => {
    if (suffix === "M+") {
      return (num / 1000000).toFixed(1);
    } else if (suffix === "%") {
      return num.toFixed(1);
    } else {
      return Math.floor(num);
    }
  };

  // Intersection Observers
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowCards(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (cardsContainerRef.current) {
      observer.observe(cardsContainerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowContainer(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowWhySection(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (whySectionRef.current) {
      observer.observe(whySectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Stats section intersection observer - only triggers once
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggeredStats) {
          setShowStatsSection(true);
          setHasTriggeredStats(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }
    return () => observer.disconnect();
  }, [hasTriggeredStats]);

  return (
    <div className="homepage">
      {/* Loading Animation */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(135deg, #1a2745 0%, #0f1419 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999,
          transition: "opacity 0.5s ease",
          opacity: showContent ? 0 : 1,
          pointerEvents: showContent ? "none" : "auto",
        }}
      >
        <img
          src={logo}
          alt="Standard Chartered"
          style={{
            position: "fixed",
            height: isLoading ? "200px" : "40px",
            transition: "all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: isLoading
              ? "translate(-50%, -50%)"
              : "translate(-50vw + 150px, -50vh + 58px)",
            left: "50%",
            top: "50%",
            zIndex: 10000,
          }}
        />
      </div>

      {/* Card Selector Modal */}
      {showCompareSelector && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10001,
            padding: "20px",
          }}
          onClick={() => setShowCompareSelector(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "40px",
              maxWidth: "1200px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <h2 style={{ fontSize: "2rem", color: "#1a2745", margin: 0 }}>
                Select Cards to Compare
              </h2>
              <button
                onClick={() => setShowCompareSelector(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                ✕
              </button>
            </div>

            <p
              style={{
                color: "#666",
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              Select 2-3 cards to compare their features and benefits
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "20px",
                marginBottom: "30px",
              }}
            >
              {allCards.map((card, idx) => (
                <div
                  key={idx}
                  style={{
                    border: compareCards.find((c) => c.name === card.name)
                      ? "3px solid #00b8b0"
                      : "2px solid #e0e6ed",
                    borderRadius: "15px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    background: compareCards.find((c) => c.name === card.name)
                      ? "#f0fffe"
                      : "#fff",
                  }}
                  onClick={() => toggleCompareCard(card)}
                >
                  <img
                    src={card.img}
                    alt={card.name}
                    style={{
                      width: "180px",
                      borderRadius: "12px",
                      marginBottom: "15px",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "1.3rem",
                      color: "#1a2745",
                      marginBottom: "10px",
                    }}
                  >
                    {card.name}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#666",
                      marginBottom: "15px",
                    }}
                  >
                    {card.bestFor}
                  </p>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#999",
                      marginBottom: "15px",
                    }}
                  >
                    {card.annualFee} • {card.rewardRate}
                  </div>

                  {compareCards.find((c) => c.name === card.name) ? (
                    <div
                      style={{
                        background: "#00b8b0",
                        color: "#fff",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      ✓ Selected
                    </div>
                  ) : (
                    <div
                      style={{
                        background:
                          compareCards.length >= 3 ? "#ccc" : "#f0f0f0",
                        color: compareCards.length >= 3 ? "#999" : "#666",
                        padding: "8px 16px",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: 600,
                        cursor:
                          compareCards.length >= 3 ? "not-allowed" : "pointer",
                      }}
                    >
                      {compareCards.length >= 3 ? "Max 3 cards" : "Select"}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                textAlign: "center",
                borderTop: "1px solid #eee",
                paddingTop: "20px",
              }}
            >
              <div style={{ marginBottom: "20px", color: "#666" }}>
                {compareCards.length} of 3 cards selected
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => {
                    if (compareCards.length >= 2) {
                      setShowCompareSelector(false);
                      setShowComparison(true);
                    }
                  }}
                  disabled={compareCards.length < 2}
                  style={{
                    background: compareCards.length >= 2 ? "#00b8b0" : "#ccc",
                    color: "#fff",
                    border: "none",
                    padding: "12px 30px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor:
                      compareCards.length >= 2 ? "pointer" : "not-allowed",
                    fontWeight: 600,
                  }}
                >
                  Compare Cards
                </button>
                <button
                  onClick={clearComparison}
                  style={{
                    background: "#f0f0f0",
                    color: "#666",
                    border: "none",
                    padding: "12px 30px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Clear Selection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Card Comparison Modal */}
      {showComparison && compareCards.length > 0 && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10001,
            padding: "20px",
          }}
          onClick={() => setShowComparison(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "40px",
              maxWidth: "1000px",
              width: "100%",
              maxHeight: "80vh",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
              }}
            >
              <h2 style={{ fontSize: "2rem", color: "#1a2745", margin: 0 }}>
                Card Comparison
              </h2>
              <button
                onClick={() => setShowComparison(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#999",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${compareCards.length}, 1fr)`,
                gap: "20px",
              }}
            >
              {compareCards.map((card, idx) => (
                <div key={idx} style={{ textAlign: "center" }}>
                  <img
                    src={card.img}
                    alt={card.name}
                    style={{
                      width: "200px",
                      borderRadius: "12px",
                      marginBottom: "20px",
                    }}
                  />
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      color: "#1a2745",
                      marginBottom: "15px",
                    }}
                  >
                    {card.name}
                  </h3>

                  <div style={{ textAlign: "left" }}>
                    <div style={{ marginBottom: "10px" }}>
                      <strong style={{ color: "#22c55e" }}>Annual Fee:</strong>{" "}
                      <span style={{ color: "#22c55e" }}>{card.annualFee}</span>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <strong style={{ color: "#22c55e" }}>Reward Rate:</strong>{" "}
                      <span style={{ color: "#22c55e" }}>
                        {card.rewardRate}
                      </span>
                    </div>
                    <div style={{ marginBottom: "10px" }}>
                      <strong style={{ color: "#22c55e" }}>Category:</strong>{" "}
                      <span style={{ color: "#22c55e" }}>{card.category}</span>
                    </div>
                    <div>
                      <strong style={{ color: "#22c55e" }}>Features:</strong>
                      <ul style={{ marginTop: "5px", paddingLeft: "20px" }}>
                        {card.features.map((feature, fidx) => (
                          <li
                            key={fidx}
                            style={{
                              fontSize: "14px",
                              marginBottom: "3px",
                              color: "#22c55e",
                            }}
                          >
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                textAlign: "center",
                marginTop: "30px",
                borderTop: "1px solid #eee",
                paddingTop: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  justifyContent: "center",
                }}
              >
                <button
                  onClick={() => {
                    setShowComparison(false);
                    setShowCompareSelector(true);
                  }}
                  style={{
                    background: "#f0f0f0",
                    color: "#666",
                    border: "none",
                    padding: "12px 30px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Change Selection
                </button>
                <button
                  onClick={clearComparison}
                  style={{
                    background: "#dc3545",
                    color: "#fff",
                    border: "none",
                    padding: "12px 30px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      >
        {/* Fixed Header */}

        {/* Replace the existing Fixed Header with this new navbar */}

        {/* Content Spacer */}
        <div style={{ height: "90px" }}></div>

        {/* Hero Card Carousel and Intro Text with Parallax */}
        <div
          ref={heroRef}
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: "60px",
            padding: "40px 0 40px 60px",
            fontSize: "30px",
            minHeight: "320px",
            transform: `translateY(${scrollY * 0.1}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          {/* Carousel with Mouse Parallax */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minWidth: "450px",
              position: "relative",
              height: "600px",
              transform: `translate(${(mousePosition.x - 50) * 0.02}px, ${
                (mousePosition.y - 50) * 0.02
              }px)`,
              transition: "transform 0.2s ease-out",
            }}
          >
            {/* Carousel Cards */}
            <div
              className="carousel-container"
              style={{ width: "450px", height: "500px" }}
            >
              {heroCards.map((card, idx) => (
                <div
                  key={idx}
                  className={`carousel-card ${
                    idx === current ? "active" : ""
                  } ${idx === prevCard ? "previous" : ""}`}
                  style={{
                    transform:
                      idx === current
                        ? `rotateY(${
                            (mousePosition.x - 50) * 0.02
                          }deg) rotateX(${(mousePosition.y - 50) * -0.01}deg)`
                        : undefined,
                    transition: "transform 0.2s ease-out",
                  }}
                >
                  <img
                    src={card.img}
                    alt={card.name}
                    style={{
                      width: "100%",
                      borderRadius: "12px",
                      marginBottom: "20px",
                      boxShadow: "0 8px 24px 0 rgba(0,0,0,0.18)",
                    }}
                  />
                  <h2
                    style={{
                      marginBottom: "10px",
                      fontSize: "2rem",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    {card.name}
                  </h2>
                  <div
                    style={{
                      color: "#e8f1fb",
                      fontSize: "1.1rem",
                      marginBottom: "18px",
                      whiteSpace: "pre-line",
                      textAlign: "center",
                    }}
                  >
                    {card.description}
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      onClick={handleApply}
                      className="glow-btn"
                      style={{
                        background: "#00b8b0",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontSize: "16px",
                        cursor: "pointer",
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Dots for navigation */}
            <div style={{ marginTop: "18px", display: "flex", gap: "8px" }}>
              {heroCards.map((_, idx) => (
                <span
                  key={idx}
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    background: idx === current ? "#00b8b0" : "#bfc9d6",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDotClick(idx)}
                />
              ))}
            </div>
          </div>
          
          <div style={{ flex: 1, marginTop: "0px", marginLeft: "300px" }}>
            <h1
              style={{
                color: "#e8f1fb",
                fontSize: "2.8rem",
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontSize: "2rem",
                  fontWeight: 500,
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  transitionDelay: "0.1s",
                }}
              >
                Introducing the all-new
              </span>
              <span
                style={{
                  display: "block",
                  background: "linear-gradient(90deg, #00b8b0, #e8f1fb)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                  transitionDelay: "0.3s",
                }}
              >
                Standard Chartered Credit Cards
              </span>
            </h1>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: "1.2rem",
                fontWeight: 400,
                lineHeight: 1.6,
                marginBottom: "16px",
                maxWidth: "500px",
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                transitionDelay: "0.5s",
              }}
            >
              Elevate your everyday experience and unlock extraordinary moments.
            </p>

            <p
              style={{
                color: "#96a8b8",
                fontSize: "1.1rem",
                fontWeight: 400,
                lineHeight: 1.6,
                marginBottom: "30px",
                maxWidth: "550px",
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                transitionDelay: "0.7s",
              }}
            >
              That promise begins with a choice—the right one for you. Our
              diverse 2025 suite offers a card for every ambition, from
              maximizing daily rewards in Chennai to accessing premier travel
              benefits across the globe. Find your perfect match below.
            </p>
            {/* --- END OF ADDITION --- */}

            <div
              style={{
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
                transitionDelay: "0.9s", // Final animation delay
              }}
            >
              <button
                className="glow-btn"
                onClick={handleApply}
                style={{
                  background: "#00b8b0",
                  border: "none",
                  padding: "12px 32px",
                  borderRadius: "10px",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#072036",
                  fontWeight: 700,
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(0, 184, 176, 0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Animated Statistics Section */}
        <div
          ref={statsSectionRef}
          style={{
            background: "linear-gradient(135deg, #1a2745 0%, #2d3748 100%)",
            padding: "80px 0",
            marginTop: "60px",
            marginBottom: "40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background Pattern */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(0, 184, 176, 0.1) 0%, transparent 50%),
                          radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
              zIndex: 1,
            }}
          />

          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 40px",
              position: "relative",
              zIndex: 2,
            }}
          >
            {/* Section Header */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "60px",
                opacity: showStatsSection ? 1 : 0,
                transform: showStatsSection
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              <h2
                style={{
                  fontSize: "3rem",
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: "15px",
                  letterSpacing: "-1px",
                }}
              >
                Trusted by Millions
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#e8f1fb",
                  maxWidth: "600px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                  opacity: 0.9,
                }}
              >
                Join millions of satisfied customers who trust Standard
                Chartered for their financial needs
              </p>
            </div>

            {/* Statistics Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "40px",
                marginBottom: "40px",
              }}
            >
              {statisticsData.map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "20px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    opacity: showStatsSection ? 1 : 0,
                    transform: showStatsSection
                      ? "translateY(0)"
                      : "translateY(40px)",
                    transition: `opacity 0.8s ease ${
                      0.2 + idx * 0.1
                    }s, transform 0.8s ease ${0.2 + idx * 0.1}s`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-5px) scale(1.02)";
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.05)";
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "15px",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div
                    style={{
                      fontSize: "3.5rem",
                      fontWeight: 700,
                      color: "#22c55e",
                      marginBottom: "10px",
                      lineHeight: 1,
                      fontFamily: "monospace",
                    }}
                  >
                    {formatNumber(statNumbers[idx], stat.suffix)}
                    {stat.suffix}
                  </div>
                  <div
                    style={{
                      fontSize: "1.2rem",
                      color: "#e8f1fb",
                      fontWeight: 600,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional credibility text */}
            <div
              style={{
                textAlign: "center",
                opacity: showStatsSection ? 1 : 0,
                transform: showStatsSection
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: "opacity 0.8s ease 1s, transform 0.8s ease 1s",
              }}
            >
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#cbd5e1",
                  maxWidth: "800px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                "Your financial success is our commitment. Experience
                world-class banking with cutting-edge security and unmatched
                customer service."
              </p>
            </div>
          </div>
        </div>

        {/* Trustworthy Banking Section */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "48px",
            marginBottom: "110px",
            transform: `translateY(${scrollY * 0.05}px)`,
            padding: "0 60px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1200px",
            }}
          >
            <div style={{ flex: 1 }}>
              <span
                style={{
                  fontSize: "4rem",
                  fontWeight: 600,
                  color: "#22c55e",
                  lineHeight: 1.05,
                  fontFamily: "inherit",
                  display: "block",
                  letterSpacing: "-2px",
                }}
              >
                Wealth and
                <br />
                Banking
              </span>
            </div>
            <div
              style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <span
                style={{
                  fontSize: "1.3rem",
                  color: "#7a8ca7",
                  fontWeight: 400,
                  maxWidth: "400px",
                  display: "block",
                  textAlign: "right",
                  lineHeight: 1.4,
                }}
              >
                Experience transparent and seamless
                <br />
                banking with security at every step.
              </span>
            </div>
          </div>
        </div>

        {/* Why Standard Chartered Section with Animated Icons */}
        <div
          ref={whySectionRef}
          style={{
            background: "#f9fafb",
            padding: "80px 0",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 40px",
            }}
          >
            {/* Section Header */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "60px",
                opacity: showWhySection ? 1 : 0,
                transform: showWhySection
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              <h2
                style={{
                  fontSize: "3.5rem",
                  fontWeight: 700,
                  color: "#1a2745",
                  marginBottom: "20px",
                  letterSpacing: "-1px",
                }}
              >
                Why Choose Standard Chartered?
              </h2>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#6b7a8f",
                  maxWidth: "600px",
                  margin: "0 auto",
                  lineHeight: 1.6,
                }}
              >
                Experience the difference with India's most trusted
                international bank
              </p>
            </div>

            {/* Benefits Grid with Hover Animations */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "40px",
                marginBottom: "60px",
              }}
            >
              {[
                {
                  icon: "🌍",
                  title: "Global Acceptance",
                  description:
                    "Use your card in over 200 countries worldwide with zero hassle and competitive exchange rates.",
                  delay: 0.1,
                },
                {
                  icon: "🔒",
                  title: "Bank-Grade Security",
                  description:
                    "Advanced fraud protection, EMV chip technology, and 24/7 monitoring keep your money safe.",
                  delay: 0.2,
                },
                {
                  icon: "💎",
                  title: "Premium Rewards",
                  description:
                    "Earn reward points on every spend and enjoy exclusive lifestyle benefits and airport lounge access.",
                  delay: 0.3,
                },
                {
                  icon: "⚡",
                  title: "Instant Approval",
                  description:
                    "Get instant digital approval and start using your card immediately with our mobile app.",
                  delay: 0.4,
                },
                {
                  icon: "🎯",
                  title: "Tailored Solutions",
                  description:
                    "Choose from our range of cards designed for your specific lifestyle and spending needs.",
                  delay: 0.5,
                },
                {
                  icon: "🏆",
                  title: "Award-Winning Service",
                  description:
                    "24/7 customer support and relationship managers to assist you whenever you need help.",
                  delay: 0.6,
                },
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#fff",
                    padding: "40px 30px",
                    borderRadius: "20px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    textAlign: "center",
                    opacity: showWhySection ? 1 : 0,
                    transform: showWhySection
                      ? "translateY(0)"
                      : "translateY(40px)",
                    transition: `opacity 0.8s ease ${benefit.delay}s, transform 0.8s ease ${benefit.delay}s, box-shadow 0.3s ease`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 40px rgba(0,0,0,0.15)";
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(0,0,0,0.08)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "20px",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  >
                    {benefit.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "#1a2745",
                      marginBottom: "15px",
                    }}
                  >
                    {benefit.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "1rem",
                      color: "#6b7a8f",
                      lineHeight: 1.6,
                    }}
                  >
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div
              style={{
                textAlign: "center",
                opacity: showWhySection ? 1 : 0,
                transform: showWhySection
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: "opacity 0.8s ease 0.7s, transform 0.8s ease 0.7s",
              }}
            >
              <h3
                style={{
                  fontSize: "2rem",
                  fontWeight: 600,
                  color: "#1a2745",
                  marginBottom: "20px",
                }}
              >
                Ready to experience banking excellence?
              </h3>
              <button
                className="glow-btn"
                onClick={handleApply}
                style={{
                  background: "#00b8b0",
                  border: "none",
                  padding: "15px 40px",
                  borderRadius: "12px",
                  fontSize: "18px",
                  fontWeight: 600,
                  cursor: "pointer",
                  color: "#fff",
                  boxShadow: "0 4px 20px rgba(0, 184, 176, 0.3)",
                }}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        {/* Card Selection Section with Filters */}
        <div
          ref={containerRef}
          className={`card-pop${showContainer ? " card-pop-visible" : ""}`}
          style={{
            background: "#f7fafd",
            borderRadius: "32px",
            margin: "32px",
            padding: "32px",
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <h2
              style={{
                color: "#4a5a6a",
                fontWeight: 500,
                fontSize: "2.2rem",
                margin: 0,
              }}
            >
              Choose Your Credit Card
            </h2>

            {/* Compare Button */}
            <button
              onClick={openCompareSelector}
              style={{
                background: "#00b8b0",
                color: "#fff",
                border: "none",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>⚖</span>
              Compare Cards
            </button>
          </div>

          {/* Filter Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginBottom: "150px",
              flexWrap: "wrap",
            }}
          >
            {filterOptions.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                style={{
                  background: selectedFilter === filter ? "#00b8b0" : "#fff",
                  color: selectedFilter === filter ? "#fff" : "#4a5a6a",
                  border:
                    selectedFilter === filter ? "none" : "2px solid #e0e6ed",
                  padding: "10px 20px",
                  borderRadius: "25px",
                  fontSize: "16px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (selectedFilter !== filter) {
                    e.currentTarget.style.borderColor = "#00b8b0";
                    e.currentTarget.style.color = "#00b8b0";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedFilter !== filter) {
                    e.currentTarget.style.borderColor = "#e0e6ed";
                    e.currentTarget.style.color = "#4a5a6a";
                  }
                }}
              >
                {filter}
              </button>
            ))}
          </div>

          <div
            ref={cardsContainerRef}
            style={{
              display: "flex",
              gap: "50px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {filteredCards.map((card, idx) => (
              <div
                key={card.name}
                className={`card-pop${showCards ? " card-pop-visible" : ""}`}
                style={{
                  background: "#fff",
                  borderRadius: "28px",
                  boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
                  padding: "48px 24px 24px 24px",
                  width: "340px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginBottom: "100px",
                  position: "relative",
                  minHeight: "300px",
                  opacity: showCards ? 1 : 0,
                  transform: showCards ? "scale(1)" : "scale(0.85)",
                  transition: `opacity 0.7s cubic-bezier(.4,2,.6,1) ${
                    0.15 * idx
                  }s, transform 0.7s cubic-bezier(.4,2,.6,1) ${
                    0.15 * idx
                  }s, box-shadow 0.3s ease`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 40px 0 rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px 0 rgba(0,0,0,0.10)";
                }}
              >
                {/* Card Image */}
                <div
                  style={{
                    width: "100%",
                    position: "absolute",
                    left: "50%",
                    top: "-90px",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ position: "relative", width: "90%" }}>
                    {/* Label */}
                    <span
                      style={{
                        position: "absolute",
                        top: "14px",
                        left: "14px",
                        background: card.labelColor,
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "13px",
                        borderRadius: "6px",
                        padding: "3px 12px",
                        zIndex: 3,
                      }}
                    >
                      {card.label}
                    </span>
                    <img
                      src={card.img}
                      alt={card.name}
                      style={{
                        width: "100%",
                        borderRadius: "18px",
                        boxShadow: "0 8px 24px 0 rgba(0,0,0,0.18)",
                      }}
                    />
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ marginTop: "110px", width: "100%" }}>
                  {/* Card Name and Icons */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: 600,
                        color: "#4a5a6a",
                        marginRight: "8px",
                      }}
                    >
                      {card.name} <span style={{ fontSize: "1.1rem" }}></span>
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <span
                        style={{
                          color: "#bfc9d6",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      >
                        ♡
                      </span>
                      <span
                        style={{
                          color: "#bfc9d6",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                      >
                        ⧉
                      </span>
                    </span>
                  </div>
                  {/* Best For Tag */}
                  <span
                    style={{
                      background: "#e7f9ef",
                      color: "#22c55e",
                      fontWeight: 700,
                      fontSize: "13px",
                      borderRadius: "4px",
                      padding: "2px 10px",
                      marginBottom: "10px",
                      display: "inline-block",
                    }}
                  >
                    BEST FOR
                  </span>
                  {/* Highlight */}
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "1.15rem",
                      color: "#4a5a6a",
                      margin: "10px 0 8px 0",
                    }}
                  >
                    {card.bestFor}
                  </div>
                  {/* Sub details */}
                  <div
                    style={{
                      color: "#6b7a8f",
                      fontSize: "15px",
                      marginBottom: "18px",
                    }}
                  >
                    {card.details}{" "}
                    <span style={{ color: "#ff9800", fontWeight: 600 }}>
                      {card.more}
                    </span>
                  </div>
                  {/* Buttons */}
                  <div style={{ display: "flex", gap: "18px" }}>
                    <button
                      onClick={handleApply}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#00b8b0",
                        fontWeight: 700,
                        fontSize: "15px",
                        cursor: "pointer",
                        letterSpacing: "1px",
                      }}
                    >
                      APPLY
                    </button>
                    <button
                      onClick={() => handleCardDetails(card.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "#00b8b0",
                        fontWeight: 700,
                        fontSize: "15px",
                        cursor: "pointer",
                        letterSpacing: "1px",
                      }}
                    >
                      DETAILS
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            background: "#131c46",
            padding: "60px 0 30px 0",
            marginTop: "60px",
          }}
        >
          <div
            style={{
              maxWidth: "1400px",
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-start",
              color: "#e8f1fb",
            }}
          >
            {/* Logo and left links */}
            <div style={{ minWidth: 280 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 24,
                }}
              >
                <img
                  src={logo}
                  alt="Standard Chartered"
                  style={{ height: 60, marginRight: 18 }}
                />
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 600,
                    fontFamily: "SCProsperSans, sans-serif",
                  }}
                >
                  standard
                  <br />
                  chartered
                </span>
              </div>
              <div style={{ lineHeight: 2, fontSize: 18 }}>
                <div>Accessibility</div>
                <div>Cookie policy</div>
                <div>Terms of use</div>
                <div>Privacy policy</div>
                <div>Modern slavery statement</div>
                <div>Regulatory disclosures</div>
                <div>Straight2Bank onboarding portal</div>
                <div>Our Code of Conduct and Ethics</div>
              </div>
            </div>
            {/* Center links */}
            <div style={{ minWidth: 280, marginTop: 60 }}>
              <div style={{ lineHeight: 2, fontSize: 18 }}>
                <div>Online security</div>
                <div>Fighting financial crime</div>
                <div>Our suppliers</div>
                <div>FAQs</div>
                <div>Our locations</div>
                <div>Contact us</div>
                <div>Sitemap</div>
                <div>Manage cookies</div>
              </div>
            </div>
            {/* Social and copyright */}
            <div style={{ minWidth: 220, textAlign: "center", marginTop: 30 }}>
              <div style={{ fontSize: 30, marginBottom: 16 }}>
                <a
                  href="https://www.facebook.com/StandardChartered/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    margin: "0 10px",
                    cursor: "pointer",
                    color: "#e8f1fb",
                  }}
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="https://www.instagram.com/stanchart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    margin: "0 10px",
                    cursor: "pointer",
                    color: "#e8f1fb",
                  }}
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://x.com/stanchart"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    margin: "0 10px",
                    cursor: "pointer",
                    color: "#e8f1fb",
                  }}
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/standardchartered/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    margin: "0 10px",
                    cursor: "pointer",
                    color: "#e8f1fb",
                  }}
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a
                  href="https://www.youtube.com/standardchartered"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    margin: "0 10px",
                    cursor: "pointer",
                    color: "#e8f1fb",
                  }}
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
              <div style={{ fontSize: 18, marginTop: 16 }}>
                © Standard Chartered 2025.
                <br />
                All Rights Reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Homepage;