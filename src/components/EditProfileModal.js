import React, { useState } from "react";

// Utility functions:
function maskPAN(pan) {
  if (!pan) return "";
  if (pan.length < 5) return pan.replace(/./g, "X");
  return "XXXXX" + pan.slice(-5);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone.replace(/\D/g, ""));
}

export default function EditProfileModal({ user, onClose, onSave }) {
  const initialDOB = user.dob.includes("/") ? "" : user.dob;
  const [form, setForm] = useState({
    ...user,
    dob: initialDOB,
    pan: user.pan.includes("X") ? "" : user.pan,
    gender: user.gender || "", // default empty if not set
    maritalStatus: user.maritalStatus || "" // default empty if not set
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full Name required";
    if (!form.gender) newErrors.gender = "Gender required";
    if (!form.dob) newErrors.dob = "Date of Birth required";
    if (!form.maritalStatus) newErrors.maritalStatus = "Marital Status required";
    if (!form.pan.trim()) newErrors.pan = "PAN Card required";
    if (!form.email.trim()) newErrors.email = "Email required";
    else if (!validateEmail(form.email.trim())) newErrors.email = "Invalid email address";
    if (!form.phone.trim()) newErrors.phone = "Phone required";
    else if (!validatePhone(form.phone.trim())) newErrors.phone = "Phone must be 10 digits";
    if (!form.address.trim()) newErrors.address = "Address required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const maskedPan = maskPAN(form.pan.trim());
    onSave({ ...form, pan: maskedPan });
  }

  return (
    <div className="customer-profile">
    <div style={styles.overlay}>
      <form style={styles.modal} onSubmit={handleSubmit} autoComplete="off">
        <div style={styles.scrollArea}>
          <h3 style={{ marginBottom: 10 }}>Edit Profile</h3>

          {/* Full Name */}
          <div style={styles.field}>
            <label style={styles.label}>Full Name *</label>
            <input
              style={styles.input(errors.fullName)}
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
            {errors.fullName && <div style={styles.error}>{errors.fullName}</div>}
          </div>

          {/* Gender */}
          <div style={styles.field}>
            <label style={styles.label}>Gender *</label>
            <select
              style={styles.input(errors.gender)}
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <div style={styles.error}>{errors.gender}</div>}
          </div>

          {/* Date of Birth */}
          <div style={styles.field}>
            <label style={styles.label}>Date of Birth *</label>
            <input
              style={styles.input(errors.dob)}
              name="dob"
              type="date"
              value={form.dob}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              required
            />
            {errors.dob && <div style={styles.error}>{errors.dob}</div>}
          </div>

          {/* Marital Status */}
          <div style={styles.field}>
            <label style={styles.label}>Marital Status *</label>
            <select
              style={styles.input(errors.maritalStatus)}
              name="maritalStatus"
              value={form.maritalStatus}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Marital Status --</option>
              <option value="Married">Married</option>
              <option value="Unmarried">Unmarried</option>
              <option value="Divorced">Divorced</option>
            </select>
            {errors.maritalStatus && <div style={styles.error}>{errors.maritalStatus}</div>}
          </div>

          {/* PAN Card */}
          <div style={styles.field}>
            <label style={styles.label}>PAN Card Number *</label>
            <input
              style={styles.input(errors.pan)}
              name="pan"
              maxLength={10}
              value={form.pan}
              onChange={handleChange}
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              title="Valid PAN format (e.g., ABCDE1234F)"
              placeholder="ABCDE1234F"
              required
            />
            {errors.pan && <div style={styles.error}>{errors.pan}</div>}
          </div>

          {/* Email */}
          <div style={styles.field}>
            <label style={styles.label}>Email Address *</label>
            <input
              style={styles.input(errors.email)}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
            {errors.email && <div style={styles.error}>{errors.email}</div>}
          </div>

          {/* Phone */}
          <div style={styles.field}>
            <label style={styles.label}>Phone Number (10 digits) *</label>
            <input
              style={styles.input(errors.phone)}
              name="phone"
              type="tel"
              maxLength={10}
              value={form.phone.replace(/\D/g, "")}
              onChange={e => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                handleChange({ target: { name: "phone", value: val } });
              }}
              placeholder="9876543210"
              required
            />
            {errors.phone && <div style={styles.error}>{errors.phone}</div>}
          </div>

          {/* Address */}
          <div style={styles.field}>
            <label style={styles.label}>Address *</label>
            <input
              style={styles.input(errors.address)}
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />
            {errors.address && <div style={styles.error}>{errors.address}</div>}
          </div>

          {/* Buttons */}
          <div style={styles.btnRow}>
            <button style={styles.btnSave} type="submit">Save</button>
            <button style={styles.btnCancel} type="button" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
    </div>
  );
}

// Styles remain mostly the same:
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
    maxHeight: 500, // slightly taller for new fields
    padding: "24px 18px",
    boxShadow: "0 2px 22px #0009",
    display: "flex",
    flexDirection: "column",
    fontFamily: '"SCProsperSans", var(--font-family)'
  },
  scrollArea: {
    overflowY: "auto",
    maxHeight: 430,
    paddingRight: 2,
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  field: {
    marginBottom: 2,
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  label: {
    fontSize: 15,
    color: "var(--muted)",
    fontWeight: 500,
    letterSpacing: "0.5px",
  },
  input: (invalid) => ({
    background: "#182a3a",
    color: "var(--text)",
    fontFamily: "inherit",
    fontSize: 15,
    padding: "10px",
    borderRadius: "var(--radius)",
    border: `1.4px solid ${invalid ? "var(--danger)" : "var(--muted)"}`,
    outline: "none",
    marginBottom: 2
  }),
  error: {
    color: "var(--danger)",
    fontSize: "13px",
    marginTop: "-1px",
    marginLeft: "1px"
  },
  btnRow: {
    display: "flex",
    gap: 10,
    marginTop: 20,
    justifyContent: "flex-end"
  },
  btnSave: {
    background: "#378ee6",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius)",
    padding: "9px 29px",
    fontWeight: 600,
    fontSize: 15,
    cursor: "pointer",
    boxShadow: "0 2px 12px #378ee666",
    letterSpacing: 1.1,
    height: "var(--btn-height)"
  },
  btnCancel: {
    background: "var(--muted)",
    color: "#182a3a",
    border: "none",
    borderRadius: "var(--radius)",
    padding: "9px 26px",
    fontWeight: 500,
    fontSize: 15,
    cursor: "pointer",
    height: "var(--btn-height)"
  }
};
