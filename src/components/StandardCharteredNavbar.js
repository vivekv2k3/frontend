import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// The navbar now receives isSignedIn and handleSignOut as props
export default function StandardCharteredNavbar({ isSignedIn, handleSignOut }) {
  const [hovered, setHovered] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 960);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // The useState for isSignedIn and the useNavigate hooks are REMOVED from here

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 960;
      if (!mobile) setIsMobileMenuOpen(false);
      setIsMobileView(mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLinkStyle = (path) => {
    const style = { ...styles.navLink };
    if (location.pathname === path || hovered === path) {
      Object.assign(style, styles.hoverLink);
    }
    if (location.pathname === path) {
      Object.assign(style, styles.activeLink);
    }
    return style;
  };

  // The rest of the component (desktopLinks, mobileLinks, JSX, and styles)
  // remains the same but will now use the props `isSignedIn` and `handleSignOut`.
  // I am including the full code below for clarity.

  const desktopLinks = (
    <div className="customer-profile">
      <div style={styles.navItems}>
        <Link
          to="/"
          onMouseEnter={() => setHovered("/")}
          onMouseLeave={() => setHovered(null)}
          style={getLinkStyle("/")}
        >
          Homepage
        </Link>

        {isSignedIn && (
          <Link
            to="/profile"
            onMouseEnter={() => setHovered("/profile")}
            onMouseLeave={() => setHovered(null)}
            style={getLinkStyle("/profile")}
          >
            Profile Page
          </Link>
        )}

        <Link
          to="/help"
          onMouseEnter={() => setHovered("/help")}
          onMouseLeave={() => setHovered(null)}
          style={getLinkStyle("/help")}
        >
          Help
        </Link>

        {isSignedIn ? (
          <button
            onClick={handleSignOut}
            onMouseEnter={() => setHovered("signout")}
            onMouseLeave={() => setHovered(null)}
            style={getLinkStyle("signout")}
          >
            Sign Out
          </button>
        ) : (
          <Link
            to="/login"
            onMouseEnter={() => setHovered("login")}
            onMouseLeave={() => setHovered(null)}
            style={getLinkStyle("/login")}
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );

  const mobileLinks = (
    <div className="customer-profile" style={styles.mobileMenuWrapper}>
      <Link
        to="/"
        style={getLinkStyle("/")}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Homepage
      </Link>
      {isSignedIn && (
        <Link
          to="/profile"
          style={getLinkStyle("/profile")}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Profile Page
        </Link>
      )}
      <Link
        to="/help"
        style={getLinkStyle("/help")}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Help
      </Link>
      {isSignedIn ? (
        <button onClick={handleSignOut} style={getLinkStyle("signout")}>
          Sign Out
        </button>
      ) : (
        <Link
          to="/login"
          style={getLinkStyle("login")}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Sign In
        </Link>
      )}
    </div>
  );

  return (
    <div className="customer-profile">
      <div style={styles.navbarWrapper}>
        <nav style={styles.navbar}>
          <div style={styles.logoContainer}>
            <Link to="/">
              <img
                src="https://assets.bbhub.io/marketing/sites/14/Standard-Chartered_logo-for-website.png"
                alt="Standard Chartered Logo"
                style={styles.logo}
              />
            </Link>
          </div>
          <div style={styles.navItemsRight}>
            {!isMobileView && desktopLinks}
            {isMobileView && (
              <button
                style={styles.hamburgerButton}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <div style={styles.hamburgerBar}></div>
                <div style={styles.hamburgerBar}></div>
                <div style={styles.hamburgerBar}></div>
              </button>
            )}
          </div>
        </nav>
        {isMobileView && isMobileMenuOpen && mobileLinks}
      </div>
    </div>
  );
}

const styles = {
  navbarWrapper: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: 110,
    background:
      "linear-gradient(90deg, var(--bg-start) 10%, var(--bg-end) 90%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1500,
  },
  navbar: {
    width: "90%",
    maxWidth: "1600px",
    height: 68,
    background: "rgba(255,255,255,0.92)",
    borderRadius: 34,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 20px 0 38px",
    boxSizing: "border-box",
    boxShadow: "0 6px 32px rgba(70,130,170,0.18)",
    fontFamily: '"SCProsperSans", var(--font-family)',
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    height: 80,
    objectFit: "contain",
    cursor: "pointer",
  },
  navItemsRight: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    minWidth: 340,
    gap: 16,
  },
  navItems: {
    display: "flex",
    alignItems: "center",
    gap: 16,
  },
  navLink: {
    color: "#174E7C",
    fontWeight: 600,
    fontSize: 18,
    textDecoration: "none",
    cursor: "pointer",
    borderRadius: "14px",
    padding: "9px 21px",
    transition: "all 0.2s ease-in-out",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    border: "none",
    fontFamily: "inherit",
  },
  activeLink: {
    background: "rgba(0, 114, 206, 0.1)",
    color: "#0072CE",
  },
  hoverLink: {
    background: "rgba(0, 114, 206, 0.05)",
    transform: "translateY(-2px)",
  },
  hamburgerButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "8px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  hamburgerBar: {
    width: "25px",
    height: "3px",
    background: "#072036",
    borderRadius: "3px",
  },
  mobileMenuWrapper: {
    position: "absolute",
    top: 115,
    left: "50%",
    transform: "translateX(-50%)",
    width: "90%",
    background: "rgba(255, 255, 255, 0.98)",
    borderRadius: "24px",
    boxShadow: "0 8px 24px rgba(70,130,170,0.18)",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    zIndex: 1400,
  },
};
