// src/Main.js


import React from 'react';
import Dashboard from './Dashboard.js';
import Approvals from './Approvals.js';
import Customers from './Customers.js';
// import Reports from './Reports.js';
import Settings from './Settings.js';

const Main = (props) => {
  const { currentSection } = props;

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard {...props} />;
      case 'approvals':
        return <Approvals {...props} />;
      case 'customers':
        return <Customers {...props} />;
      // case 'reports':
      //   return <Reports {...props} />;
      case 'settings':
        return <Settings {...props} />;
      default:
        return <Dashboard {...props} />;
    }
  };

  return (
    <main className="main agent-portal " id="main" style={{ paddingTop: '120px' }}>
      {renderSection()}
    </main>
  );
};

export default Main;
