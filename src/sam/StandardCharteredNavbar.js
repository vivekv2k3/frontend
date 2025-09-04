// src/StandardCharteredNavbar.js


import React, { useState, useEffect } from 'react';///Users/sanidhyagupta/Documents/Axess academy /final/src/arijeet/images/bg.png
import logo from '../arijeet/images/logo1.png'; 

// A simple helper function for initials, moved here for convenience
const initials = (name = '') => (name.split(' ').map(s => s[0]).slice(0, 2).join('') || 'SC').toUpperCase();

// The component now accepts the 'profile' prop
export default function StandardCharteredNavbar({ currentSection, onNavClick, profile }) {
  
  // --- CHANGE 1: Add state to track the hovered item ---
  const [hovered, setHovered] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 960);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Effect to detect screen size and update the view
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 960;
      if (!mobile) {
        setIsMobileMenuOpen(false); // Close menu on resize to desktop
      }
      setIsMobileView(mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getLinkStyle = (section) => {
    const style = { ...styles.navLink };
    if (currentSection === section) {
      Object.assign(style, styles.activeLink);
    }
    // --- CHANGE 2: Apply a hover style if the item is hovered ---
    if (hovered === section) {
      Object.assign(style, styles.hoverLink);
    }
    return style;
  };

  // A small component for the avatar to keep the code clean
  const Avatar = ({ user }) => {
    const style = {
      width: '40px',
      height: '40px',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%', // Make it circular
      fontWeight: '700',
      color: '#072036',
      background: 'linear-gradient(135deg, #e0eef8, #ddefee)',
      marginRight: '12px',
    };

    if (user.photo) {
      style.backgroundImage = `url(${user.photo})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
      return <div style={style}></div>;
    }
    return <div style={style}>{initials(user.name)}</div>;
  };

  return (
    <div classname="agent-portal">
      <div style={styles.navbarWrapper}>
        <nav style={styles.navbar}>
          <div style={styles.leftNav}>
            <img
              src={logo}
              // src="https://assets.bbhub.io/marketing/sites/14/Standard-Chartered_logo-for-website.png"
              alt="Standard Chartered Logo"
              style={styles.logo}
            />
            {/* Renders the nav items only on desktop view */}
            {!isMobileView && (
              <div style={styles.navItems}>
                {["dashboard", "approvals", "customers"].map(
                  (section) => (
                    <button
                      key={section}
                      onMouseEnter={() => setHovered(section)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => onNavClick(section)}
                      style={getLinkStyle(section)}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <div style={styles.rightNav}>
            {/* This is the same profile button, but now the name is hidden on mobile */}
            <button
              onMouseEnter={() => setHovered("settings")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => {
                onNavClick("settings");
                if (isMobileView) setIsMobileMenuOpen(false);
              }}
              style={getLinkStyle("settings")}
            >
              <Avatar user={profile} />
              {!isMobileView && (
                <span style={styles.profileName}>{profile.name}</span>
              )}
            </button>

            {/* The hamburger button now lives here, and only appears on mobile */}
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

        {/* --- NEW: Mobile menu panel that appears when open --- */}
        {isMobileView && isMobileMenuOpen && (
          <div style={styles.mobileMenuWrapper}>
            {["dashboard", "approvals", "customers"].map(
              (section) => (
                <button
                  key={section}
                  style={getLinkStyle(section)}
                  // Re-use hover state for a "tap & hold" effect on mobile
                  onMouseEnter={() => setHovered(section)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => {
                    onNavClick(section);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              )
            )}
          </div>
        )}
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
    background: "linear-gradient(90deg, var(--bg-start) 10%, var(--bg-end) 90%)",
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
  leftNav: {
    display: 'flex',
    alignItems: 'center',
    gap: 48,
  },
  logo: {
    height: 75,
    objectFit: "contain",
    cursor: "pointer",
  },
  navItems: {
    display: "flex",
    gap: 16,
    alignItems: "center",
  },
  navLink: {
    color: "#174E7C",
    fontWeight: 600,
    fontSize: 18,
    textDecoration: "none",
    cursor: "pointer",
    borderRadius: "14px",
    padding: "9px 21px",
    transition: "all 0.2s ease-in-out", // Smoother transition for all properties
    background: "transparent",
    border: "none",
    fontFamily: 'inherit',
    display: 'flex', // Added for profile button alignment
    alignItems: 'center', // Added for profile button alignment
  },
  activeLink: {
    background: "rgba(0, 114, 206, 0.1)",
    color: "#0072CE",
  },
  // --- CHANGE 4: Define the new hover style ---
  hoverLink: {
    background: "rgba(0, 114, 206, 0.05)",
    transform: "translateY(-2px)", // Lifts the button slightly
  },
  rightNav: {
    display: 'flex',
    alignItems: 'center',
  },
  profileName: {
    color: "#174E7C",
    fontWeight: 700,
    fontSize: 16,
    padding: '0 16px 0 0', // Adjusted padding
  },
  hamburgerButton: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  hamburgerBar: {
    width: '25px',
    height: '3px',
    background: '#072036',
    borderRadius: '3px'
  },
  mobileMenuWrapper: {
    position: 'absolute',
    top: 'calc(100% + 5px)', // Position below the main navbar
    left: '50%',
    transform: 'translateX(-50%)',
    width: '90%',
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '24px',
    boxShadow: '0 8px 24px rgba(70,130,170,0.18)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    zIndex: 1400
  },
};