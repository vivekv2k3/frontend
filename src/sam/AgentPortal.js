// src/ App.js

import React, { useState, useEffect, useCallback } from 'react';
import './AgentPortal.css';
// import { sampleApprovals, sampleCustomers } from './data.js';
import StandardCharteredNavbar from './StandardCharteredNavbar.js';
import Main from './Main.js';
import Modal from './Modal.js';

function AgentPortal({ handleSignOut }) {
  const [approvals, setApprovals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [userActivity, setUserActivity] = useState([]);
  const [theme, setTheme] = useState('dark');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modal, setModal] = useState({ isOpen: false, type: '', message: '' });
  const [selectedApprovals, setSelectedApprovals] = useState([]);
  const [profile, setProfile] = useState({
    name: 'Sanidhya Gupta',
    role: 'Sales Approver',
    id: 'AP-0042',
    phone: '+91 90000 11111',
    email: 'sanidhya.g@example.com',
    location: 'Chennai, India',
    photo: null,
  });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    const savedPhoto = localStorage.getItem('userProfilePhoto');
    if (savedPhoto) {
      setProfile(p => ({ ...p, photo: savedPhoto }));
    }
  }, []);
  useEffect(() => {
    fetch('http://localhost:8080/api/customers/pending')
      .then(res => res.json())
      .then(data => setApprovals(data))
      .catch(err => console.error("Failed to fetch pending approvals:", err));

    fetch('http://localhost:8080/api/customers/all')
      .then(res => res.json())
      .then(data => {
        //const formattedCustomers = data.map(c => ({...c, cid: c.id}));
        //setCustomers(formattedCustomers);
        setCustomers(data);
      })
      .catch(err => console.error("Failed to fetch approved customers:", err));
}, []);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const logActivity = useCallback((action, name, id) => {
    setUserActivity(prevActivity => {
      const newActivity = [{ action, name, id, time: new Date() }, ...prevActivity];
      return newActivity.slice(0, 10);
    });
  }, []);

//   const handleApprovalAction = useCallback((actionType, ids) => {
//   const affectedApprovals = [];
//   // First, create the new state array and identify which items were changed
//   const updatedApprovals = approvals.map(approval => {
//     if (ids.includes(approval.id) && approval.status === 'pending') {
//       const newApproval = { ...approval, status: actionType };
//       affectedApprovals.push(newApproval);
//       return newApproval;
//     }
//     return approval;
//   });

//   // Now, update the state with the new array
//   setApprovals(updatedApprovals);

//   // Finally, log the activity for each changed item
//   affectedApprovals.forEach(app => {
//     logActivity(actionType === 'approved' ? 'Approved' : 'Rejected', app.name, app.id);
//   });
// }, [approvals, logActivity]); // We add 'approvals' to the dependency array because we now read from it directly
// REPLACE the old function with this NEW one
  // This is the NEW, CORRECTED function
const handleApprovalAction = useCallback((actionType, ids) => {
  ids.forEach(id => {
    fetch(`http://localhost:8080/api/customers/${id}/application-status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: actionType }) // Sends 'approved' or 'rejected'
    })
    .then(response => response.json())
    .then(updatedCustomer => {
      // 1. Remove from the 'Approvals' (pending) list on screen
      setApprovals(prev => prev.filter(app => app.id !== updatedCustomer.id));

      // 2. Update the customer's status in the main 'customers' list.
      // This ensures that both 'approved' and 'rejected' changes are reflected immediately.
      setCustomers(prevCustomers =>
        prevCustomers.map(customer =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        )
      );

      // 3. Log the activity
      logActivity(
        actionType === 'approved' ? 'Approved' : 'Rejected',
        updatedCustomer.name,
        updatedCustomer.id
      );
    });
  });

  setModal({ ...modal, isOpen: false });
  setSelectedApprovals([]);
  toast(`${ids.length} application(s) processed.`);

}, [logActivity, modal, setApprovals, setCustomers]); // Updated dependencies

  const addCustomer = (customer, approval) => {
    setCustomers(prev => [customer, ...prev]);
    setApprovals(prev => [approval, ...prev]);
  };
  
  const updateCustomer = (updatedCustomerData) => {
  fetch(`http://localhost:8080/api/customers/${updatedCustomerData.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedCustomerData),
  })
    .then(response => response.json())
    .then(savedCustomer => {
      setCustomers(prev =>
        prev.map(c => (c.id === savedCustomer.id ? savedCustomer : c))
      );
      toast(`Customer ${savedCustomer.name} was updated.`);
    })
    .catch(error => {
      console.error("Error updating customer:", error);
      toast('Failed to update customer details.');
    });
};

const deleteCustomer = (customerId) => {
  fetch(`http://localhost:8080/api/customers/${customerId}`, {
    method: 'DELETE',
  })
    .then(response => {
      if (response.ok) {
        setCustomers(prev => prev.filter(c => c.id !== customerId));
        setApprovals(prev => prev.filter(a => a.id !== customerId));
        toast(`Customer record deleted.`);
      } else {
        throw new Error('Failed to delete customer');
      }
    })
    .catch(error => {
      console.error("Error deleting customer:", error);
      toast('Failed to delete customer record.');
    });
  };
  const updateApprovalTag = useCallback((approvalId, tag) => {
    setApprovals(prevApprovals =>
      prevApprovals.map(approval => {
        if (approval.id === approvalId) {
          // This will update the 'flags' property on the specific approval
          return { ...approval, flags: tag ? [tag] : [] };
        }
        return approval;
      })
    );
  }, []); // The empty dependency array is okay here

  const showConfirmModal = (message, onConfirm) => {
    setModalContent({ type: 'confirm', message, onConfirm });
    setIsModalOpen(true);
  };

  const showCustomerModal = (customer) => {
    const correspondingApproval = approvals.find(app => app.name === customer?.name);
    setModalContent({ type: 'customer', customer, correspondingApproval });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const updateProfile = (newProfile) => {
      setProfile(p => ({...p, ...newProfile}));
  };

  const updateProfilePhoto = (photoUrl) => {
      localStorage.setItem('userProfilePhoto', photoUrl);
      setProfile(p => ({...p, photo: photoUrl}));
      toast('Profile photo updated!');
  }

  const toast = (msg) => {
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.right = '20px';
      el.style.bottom = '20px';
      el.style.padding = '12px 16px';
      el.style.background = 'linear-gradient(90deg, var(--sc-blue), var(--sc-green))';
      el.style.color = '#fff';
      el.style.borderRadius = '10px';
      el.style.boxShadow = '0 10px 30px rgba(2,8,23,0.6)';
      el.style.zIndex = 140;
      el.style.transition = 'opacity 0.6s';
      el.textContent = msg;
      document.body.appendChild(el);
      setTimeout(() => { el.style.opacity = '0'; }, 1800);
      setTimeout(() => { el.remove(); }, 2400);
  };
  const handleNavClick = (section) => {
    setCurrentSection(section);
    closeModal();
  };

  return (
    <div className= {`app-container agent-portal ${theme}`}>
      <StandardCharteredNavbar 
        currentSection={currentSection}
        onNavClick={handleNavClick}
        profile={profile} /* --- THIS PROP IS NOW PASSED --- */
      />
      <Main
        currentSection={currentSection}
        approvals={approvals}
        customers={customers}
        userActivity={userActivity}
        onApprovalAction={handleApprovalAction}
        onCustomerAction={{ add: addCustomer, update: updateCustomer, delete: deleteCustomer }}
        onShowCustomerModal={showCustomerModal}
        onShowConfirmModal={showConfirmModal}
        onUpdateApprovalTag={updateApprovalTag}
        profile={profile}
        onUpdateProfile={updateProfile}
        onUpdateProfilePhoto={updateProfilePhoto}
        onToggleTheme={toggleTheme}
        toast={toast}
        handleSignOut={handleSignOut} 
      />
      {isModalOpen && (
        <Modal
          theme={theme}
          content={modalContent}
          onClose={closeModal}
          onAddCustomer={addCustomer}
          onUpdateCustomer={updateCustomer}
          onUpdateApprovalTag={updateApprovalTag}
          toast={toast}
          customers={customers}
          approvals={approvals}
        />
      )}
    </div>
  );
}

export default AgentPortal;
