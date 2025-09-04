import React, { useState } from "react";

const docOptions = [
  "Aadhar Proof",
  "PAN Card",
  "Identity Proof",
  "Payslip",
  "Address Proof",
  "Other"
];

export default function UploadDocumentModal({ onClose, onUpload }) {
  const [docType, setDocType] = useState(docOptions[0]);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  function handleFileChange(e) {
    const selected = e.target.files[0];
    if (!selected) return;
    if (selected.size > 2 * 1024 * 1024) {
      setError("File must be less than 2MB.");
      setFile(null);
      return;
    }
    setFile(selected);
    setError("");
  }


  function handleSubmit(e) {
    e.preventDefault();
    if (!docType) {
      setError("Please select document type.");
      return;
    }
    if (!file) {
      setError("Please upload your document file.");
      return;
    }
    setError("");
    // You would need to handle actual upload to backend here.
    onUpload({
      name: file.name,
      status: "Pending", // default status
      type: docType,
      file, // Pass file for actual upload in backend
    });
  }

  return (
    <div className="customer-profile">
    <div style={styles.overlay}>
      <form style={styles.modal} onSubmit={handleSubmit} autoComplete="off">
        <h3 style={{ marginBottom: 10 }}>Upload Document</h3>
        {/* Document Type Dropdown */}
        <div style={styles.field}>
          <label style={styles.label}>Document Type *</label>
          <div style={styles.selectWrapper}>
            <select
              style={styles.selectInput}
              value={docType}
              onChange={e => setDocType(e.target.value)}
              required
            >
              {docOptions.map(opt =>
                <option key={opt} value={opt}>{opt}</option>
              )}
            </select>
            <span style={styles.selectArrow}>▼</span>
          </div>
        </div>

        {/* File Upload Field */}
        <div style={styles.field}>
          <label style={styles.label}>Upload File *</label>
          <div style={styles.fileRow}>
            <label htmlFor="doc-upload" style={styles.attachBtn}>
              <span role="img" aria-label="attach" style={styles.attachIcon}>📎</span>
              <span style={{ marginLeft: 8 }}>Choose File</span>
            </label>
            <input
              id="doc-upload"
              type="file"
              accept=".pdf,.jpeg,.jpg,.png"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <span style={{ marginLeft: 16, color: "var(--muted)", fontSize: 14 }}>
              {file ? file.name : "No file chosen"}
            </span>
          </div>
          <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>
            PDF, JPEG, PNG (min 2MB)
          </div>
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <div style={{ display: "flex", gap: 10, marginTop: 22, justifyContent: "flex-end" }}>
          <button style={styles.btn} type="submit">Upload</button>
          <button style={styles.cancel} type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
    background: "#02101acc", zIndex: 1200, display: "grid", placeItems: "center",
    backdropFilter: "blur(8px)"
  },
  modal: {
    background: "rgba(0, 68, 129, 0.18)",
    color: "var(--text)",
    borderRadius: "var(--radius)",
    minWidth: 390,
    maxWidth: 440,
    padding: "35px 25px",
    boxShadow: "0 2px 22px #0008",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontFamily: '"SCProsperSans", var(--font-family)'
  },
  field: {
    marginBottom: 2,
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },
  label: {
    fontSize: 15,
    color: "var(--muted)",
    marginBottom: 2,
    fontWeight: 500,
    letterSpacing: "0.5px"
  },

  fileRow: {
    display: "flex",
    alignItems: "center",
    gap: 6
  },

  attachBtn: {
    background: "#378ee6",
    color: "#fff",
    borderRadius: "var(--radius)",
    cursor: "pointer",
    padding: "7px 18px",
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    fontSize: 14,
    border: "none",
    boxShadow: "0 2px 12px #378ee666"
  },
  attachIcon: {
    fontSize: 18,
    verticalAlign: "middle"
  },
  error: {
    color: "var(--danger)",
    fontSize: "13px",
    marginTop: "-1px",
    marginLeft: "1px"
  },
  btn: {
    background: "var(--success)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius)",
    padding: "8px 23px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    height: "var(--btn-height)"
  },
  cancel: {
    background: "var(--muted)",
    color: "#182a3a",
    border: "none",
    borderRadius: "var(--radius)",
    padding: "8px 21px",
    fontWeight: 500,
    fontSize: 15,
    cursor: "pointer",
    height: "var(--btn-height)"
  },
  selectWrapper: {
    position: "relative",
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  selectInput: {
    // matches your input style but ensures room for arrow
    width: "100%",
    background: "#182a3a",
    color: "var(--text)",
    fontFamily: "inherit",
    fontSize: 15,
    padding: "10px 38px 10px 10px",  // <-- make room for arrow on right!
    borderRadius: "var(--radius)",
    border: "1.4px solid var(--muted)",
    outline: "none",
    marginBottom: 2,
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
  },
  selectArrow: {
    position: "absolute",
    right: 16,              // aligns inside select edge
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",  // lets select be clickable
    fontSize: 19,
    color: "#378ee6",
    zIndex: 2
  },


};
