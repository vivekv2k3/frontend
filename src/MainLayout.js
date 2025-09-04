import React from "react";
import { Outlet } from "react-router-dom";
import StandardCharteredNavbar from "./components/StandardCharteredNavbar";
import "./Ankita.css";
import "./vivek-vasanth/theme.css";

const MainLayout = ({ isSignedIn, handleSignOut }) => {
  return (
    <div className="customer-profile">
      <>
        <StandardCharteredNavbar
          isSignedIn={isSignedIn}
          handleSignOut={handleSignOut}
        />
        <main style={{ paddingTop: "110px" }}>
          {/* 👇 CHANGE THIS LINE to pass the isSignedIn state as context */}
          <Outlet context={{ isSignedIn }} />
        </main>
      </>
    </div>
  );
};

export default MainLayout;
