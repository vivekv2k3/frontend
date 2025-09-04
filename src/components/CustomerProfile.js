import React, { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import UploadDocumentModal from "./UploadDocumentModal";
import NotificationInbox from "./NotificationInbox";

const initialUser = {
  fullName: "Ankita",
  gender: "Female",
  dob: "XX/XX/2003",
  maritalStatus: "Single",
  pan: "XXXXX9876X",
  email: "mou.de022@example.com",
  phone: "(+91) XXX-XXX-1234",
  address: "123, Main Road Tharamani",
};

const initialDocs = [
  { name: "PAN Card.pdf", status: "Verified" },
  { name: "Address Proof.pdf", status: "Pending" },
  { name: "Identity Proof.pdf", status: "Action Required" },
];

const statusColors = {
  Verified: "var(--success)",
  Pending: "#ffd24c",
  "Action Required": "var(--danger)",
};

const steps = [
  "In Progress",
  "Under Review",
  "Documents Verified",
  "Approved",
];

export default function CustomerProfile() {
  const [user, setUser] = useState(initialUser);
  const [docs, setDocs] = useState(initialDocs);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isUploadDocOpen, setUploadDocOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false); // notifications modal toggle

  const currentStep = 2;

  const handleEditProfile = (newData) => {
    setUser({ ...user, ...newData });
    setEditProfileOpen(false);
  };

  const handleUploadDoc = (doc) => {
    setDocs([...docs, doc]);
    setUploadDocOpen(false);
  };

  return (
    <div className="customer-profile">
    <div style={styles.pageBg}>
      <h2 style={styles.heading}>Customer Profile</h2>

      <div style={styles.mainRow}>
        {/* Left: Profile card */}
        <div style={styles.card}>
          <div style={styles.profileRow}>
            <div style={styles.profilePic}>Profile</div>
            <div style={styles.profileInfo}>
              <div style={styles.fullName}>{user.fullName}</div>
              <div style={styles.label}>Gender: {user.gender}</div>
              <div style={styles.label}>Date of Birth: {user.dob}</div>
              <div style={styles.label}>Marital Status: {user.maritalStatus}</div>
              <div style={styles.label}>PAN Card Number: {user.pan}</div>
              <div style={styles.label}>Email: {user.email}</div>
              <div style={styles.label}>Phone: {user.phone}</div>
              <div style={styles.label}>Address: {user.address}</div>
            </div>
          </div>
          <button style={styles.editBtn} onClick={() => setEditProfileOpen(true)}>
            Edit Profile
          </button>
        </div>

        {/* Right: Application Status + Uploaded Docs */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={styles.card}>
            {/* bell to open notifications */}
            <div style={styles.bellWrapper} onClick={() => setNotifOpen(true)} title="View Notifications">
              <span role="img" aria-label="notifications" style={styles.bellIcon}>🔔</span>
            </div>
            <h3 style={{ marginTop: 0 }}>Application Status</h3>
            <div style={styles.statusBar}>
              {steps.map((step, idx) => (
                <React.Fragment key={step}>
                  <div
                    style={{
                      position: "relative",
                      minWidth: 46,
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onMouseEnter={() => setHoverIdx(idx)}
                    onMouseLeave={() => setHoverIdx(null)}
                  >
                    <div
                      style={{
                        ...styles.circle,
                        background:
                          idx + 1 < currentStep
                            ? "var(--success)"
                            : idx + 1 === currentStep
                            ? "#378ee6"
                            : "var(--muted)",
                        color: idx + 1 <= currentStep ? "#fff" : "#394b5e",
                        cursor: "pointer",
                      }}
                    >
                      {idx + 1}
                    </div>
                    {hoverIdx === idx && (
                      <div style={styles.tooltip}>{step}</div>
                    )}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      style={{
                        ...styles.line,
                        background:
                          idx + 1 < currentStep
                            ? "var(--success)"
                            : "var(--muted)",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div style={styles.statusMsg}>
              <b style={{ color: "#378ee6" }}>{steps[currentStep - 1]}.</b> We are assessing your details and documents.
            </div>
          </div>

          <div style={styles.card}>
            <h3 style={{ marginTop: 0 }}>Uploaded Documents</h3>
            <div>
              {docs.map((doc, i) => (
                <div key={i} style={styles.docRow}>
                  <span>
                    <span role="img" aria-label="file" style={{ marginRight: 10 }}>📄</span>
                    {doc.name}
                  </span>
                  <span style={{
                    ...styles.badge,
                    background: statusColors[doc.status] || "var(--muted)",
                  }}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
            <button style={styles.uploadBtn} onClick={() => setUploadDocOpen(true)}>
              Upload New Document
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isEditProfileOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setEditProfileOpen(false)}
          onSave={handleEditProfile}
        />
      )}
      {isUploadDocOpen && (
        <UploadDocumentModal
          onClose={() => setUploadDocOpen(false)}
          onUpload={handleUploadDoc}
        />
      )}

      {/* Notifications Modal */}
      {notifOpen && (
        <div style={styles.notifOverlay}>
          <div style={styles.notifModal}>
            <div style={styles.notifHeader}>
              <span>Notifications</span>
              <button style={styles.notifClose} onClick={() => setNotifOpen(false)}>✖</button>
            </div>
            <div style={styles.notifContent}>
              <NotificationInbox />
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

const styles = {
  pageBg: {
    minHeight: "100vh",
    background: "var(--page-bg)",
    padding: "48px 0",
    fontFamily: '"SCProsperSans", var(--font-family)',
    position: "relative",
  },
  heading: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 34,
    color: "var(--text)",
    letterSpacing: 1.5,
  },
  mainRow: {
    display: "flex",
    gap: 38,
    alignItems: "flex-start",
    maxWidth: 1200,
    margin: "auto",
  },
  card: {
    background: "var(--card-bg)",
    borderRadius: "var(--radius)",
    boxShadow: "0 4px 24px #0002",
    padding: "32px 28px",
    display: "flex",
    flexDirection: "column",
    gap: 18,
    minWidth: 340,
    position: "relative",
  },
  profileRow: {
    display: "flex",
    gap: 18,
  },
  profilePic: {
    width: 88,
    height: 88,
    background: "var(--muted)",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    fontWeight: 600,
    color: "#182a3a",
    fontSize: 22,
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    fontSize: 16,
    lineHeight: 1.7,
    color: "var(--text)",
    flex: 1,
  },
  fullName: {
    fontWeight: "bold",
    fontSize: "1.2em",
  },
  label: {
    color: "var(--muted)",
    fontWeight: 500,
    fontSize: 14,
  },
  editBtn: {
    position: "absolute",
    top: 24,
    right: 28,
    background: "#378ee6",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius)",
    padding: "7px 18px",
    fontWeight: 500,
    fontSize: 14,
    cursor: "pointer",
    boxShadow: "0 2px 12px #378ee666",
    height: "36px",
    letterSpacing: 1,
  },
  bellWrapper: {
    position: "absolute",
    top: 16,
    right: 18,
    cursor: "pointer",
    background: "rgba(255,255,255,0.12)",
    borderRadius: "50%",
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px #0001",
  },
  bellIcon: {
    fontSize: 23,
    color: "#378ee6",
  },
  statusBar: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "16px 0 12px 0",
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: 15,
    boxShadow: "0 1px 8px #0003",
  },
  line: {
    width: 46,
    height: 6,
    borderRadius: 4,
  },
  tooltip: {
    position: "absolute",
    top: 42,
    left: "50%",
    transform: "translateX(-50%)",
    padding: "6px 14px",
    background: "var(--card-bg)",
    color: "var(--text)",
    fontSize: 14,
    borderRadius: "var(--radius)",
    boxShadow: "0 2px 10px #0004",
    border: "1px solid var(--muted)",
    whiteSpace: "nowrap",
  },
  statusMsg: {
    color: "var(--muted)",
    fontSize: 15,
    marginTop: 8,
  },
  docRow: {
    display: "flex",
    justifyContent: "space-between",
    background: "var(--glass)",
    borderRadius: "var(--radius)",
    padding: "10px 14px",
    fontSize: 15,
    marginBottom: 8,
  },
  badge: {
    borderRadius: "var(--radius)",
    padding: "3px 13px",
    fontWeight: 600,
    fontSize: 13,
    color: "#fff",
    textTransform: "capitalize",
    boxShadow: "0 1px 8px #0002",
  },
  uploadBtn: {
    marginTop: 16,
    background: "var(--success)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius)",
    fontSize: 15,
    padding: "9px 24px",
    cursor: "pointer",
    fontWeight: 600,
  },
  notifOverlay: {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  zIndex: 5000,
  background: "rgba(2, 16, 26, 0.38)", // dimmed overlay
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // REMOVE: backdropFilter or filter!
},

notifModal: {
  background: "rgba(0, 68, 129, 0.18)",            // frosted white glass
  borderRadius: "var(--radius)",
  boxShadow: "0 6px 32px #00448155",
  minWidth: 540,
  maxWidth: 660,
  height: "auto",
  maxHeight: 380,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: 0,
  overflow: "hidden",
  backdropFilter: "blur(20px)",                     // core glass morphism!
  WebkitBackdropFilter: "blur(20px)",               // fixes Safari
  border: "1.5px solid rgba(255,255,255,0.23)",     // glassy soft border
},




  notifHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 22px 6px 22px",
  fontWeight: 600,
  color: "var(--text)",
  fontSize: 18,
  },
    notifClose: {
    background: "none",
    border: "none",
    color: "rgba(229, 32, 32, 0.7)",
    fontSize: 18,
    cursor: "pointer",
    fontWeight: 700,
    borderRadius: 4,
    padding: "3px 7px",
  },
  notifContent: {
    maxHeight: 340,
    overflowY: "auto",
    padding: "16px 22px 18px 22px",
  },
};
