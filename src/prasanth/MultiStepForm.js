import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css"; // Keep the CSS import
import breezeCard from './assets/BreezeCC.png';
import evergreenCard from './assets/EvergreenCC.png';
import ultimatumCard from './assets/UltimateCC.png';
import platinumCard from './assets/ParisPlatCC.png';
import atmCardImage from './assets/atmcard-prasanth.png';

// Navbar Component
// const StandardCharteredNavbar = ({ toggleTheme, currentTheme }) => {
//   const navbarWrapperStyle = {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "110px",
//     background: "linear-gradient(90deg, #02101a 10%, #071226 90%)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000,
//   };

//   const navbarStyle = {
//     width: "70%",
//     minWidth: "370px",
//     maxWidth: "1200px",
//     height: "68px",
//     background: "rgba(255,255,255,0.92)",
//     borderRadius: "34px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "0 38px",
//     boxSizing: "border-box",
//     boxShadow: "0 6px 32px rgba(70,130,170,0.18)",
//   };

//   const logoContainerStyle = {
//     display: "flex",
//     alignItems: "center",
//   };

//   const logoStyle = {
//     height: "50px",
//     objectFit: "contain",
//     cursor: "pointer",
//   };

//   const navItemsStyle = {
//     display: "flex",
//     gap: "32px",
//     alignItems: "center",
//   };

//   const navLinkStyle = {
//     color: "#174E7C",
//     fontWeight: 600,
//     fontSize: "18px",
//     textDecoration: "none",
//     cursor: "pointer",
//     borderRadius: "14px",
//     padding: "9px 21px",
//     transition: "background 0.2s, color 0.2s",
//   };

//   const themeToggleStyle = {
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "24px",
//     padding: "5px",
//     borderRadius: "50%",
//     width: "40px",
//     height: "40px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     transition: "all 0.3s ease",
//   };

//   // Add hover effect with JavaScript since inline styles don't support pseudo-classes
//   const handleMouseEnter = (e) => {
//     e.target.style.background = "rgba(23, 78, 124, 0.1)";
//   };
  
//   const handleMouseLeave = (e) => {
//     e.target.style.background = "transparent";
//   };

//   return (
//     <div style={navbarWrapperStyle}>
//       <nav style={navbarStyle}>
//         <div style={logoContainerStyle}>
//           <img
//             src="https://assets.bbhub.io/marketing/sites/14/Standard-Chartered_logo-for-website.png"
//             alt="Standard Chartered Logo"
//             style={logoStyle}
//           />
//         </div>
//         <div style={navItemsStyle}>
//           <a 
//             href="#homepage" 
//             style={navLinkStyle}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >Homepage</a>
//           {/* <a 
//             href="#creditcard" 
//             style={navLinkStyle}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >Credit Card</a> */}
//           <a 
//             href="#profile" 
//             style={navLinkStyle}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >Profile Page</a>
//           <a 
//             href="#help" 
//             style={navLinkStyle}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >Help</a>
//           <button 
//             onClick={toggleTheme}
//             style={themeToggleStyle}
//             title={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} mode`}
//           >
//             {currentTheme === 'dark' ? '☀️' : '🌙'}
//           </button>
//           <a 
//             href="#signout" 
//             style={navLinkStyle}
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >Sign Out</a>
//         </div>
//       </nav>
//     </div>
//   );
// };

// ProgressBar Component
function ProgressBar({ currentStep, totalSteps }) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Container styles
  const containerStyle = {
    width: "100%",
    height: "6px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "3px",
    marginBottom: "30px",
    position: "relative"
  };

  // Progress bar styles
  const progressBarStyle = {
    height: "100%",
    backgroundColor: "var(--success)",
    borderRadius: "3px",
    transition: "width 0.3s ease",
    width: `${progressPercentage}%`
  };

  // Step indicator styles
  const stepIndicatorStyle = {
    position: "absolute",
    right: "0",
    top: "10px",
    color: "var(--muted)",
    fontSize: "12px"
  };

  return (
    <div className="multi-step-form">
    <div style={containerStyle}>
      <div style={progressBarStyle}></div>
      <div style={stepIndicatorStyle}>
        Step {currentStep} of {totalSteps}
      </div>
    </div>
    </div>
  );
}

// Step1 Component
function Step1({ onNext, defaultData }) {
  const [data, setData] = useState({
    fullName: defaultData.fullName || "",
    dob: defaultData.dob || "",
    gender: defaultData.gender || "",
    parentName: defaultData.parentName || "",
    maritalStatus: defaultData.maritalStatus || "",
    email: defaultData.email || "",
    mobile: defaultData.mobile || "",
    address: defaultData.address || "",
    state: defaultData.state || "",
    currentCity: defaultData.currentCity || "",
    pinCode: defaultData.pinCode || "",
    photo: defaultData.photo || null
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    
    switch (name) {
      case "fullName":
        if (!value.trim()) error = "Full name is required";
        else if (!/^[a-zA-Z ]+$/.test(value)) error = "Name should contain only letters";
        break;
      case "dob":
        if (!value) error = "Date of birth is required";
        else {
          const dob = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - dob.getFullYear();
          const monthDiff = today.getMonth() - dob.getMonth();
          
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            error = "Invalid date of birth";
          }
          
          if (age < 18) error = "You must be at least 18 years old";
        }
        break;
      case "parentName":
        if (!value.trim()) error = "Parent name is required";
        else if (!/^[a-zA-Z ]+$/.test(value)) error = "Parent name should contain only letters";
        break;
      case "email":
        if (!value) error = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Invalid email format";
        break;
      case "mobile":
        if (!value) error = "Mobile number is required";
        else if (!/^[0-9]{10}$/.test(value)) error = "Invalid mobile number (10 digits required)";
        break;
      case "pinCode":
        if (!value) error = "Pincode is required";
        else if (!/^[0-9]{6}$/.test(value)) error = "Pincode must be 6 digits";
        break;
      case "gender":
      case "maritalStatus":
        if (!value) error = "This field is required";
        break;
      
      case "state":
      case "currentCity":
      if (!value.trim()) {
        error = "This field is required";
      } else if (/[0-9]/.test(value)) {
        error = "City name cannot contain numbers";
      } else if (!/^[a-zA-Z\s\-']+$/.test(value)) {
        error = "Only letters, spaces, hyphens and apostrophes are allowed";
      }
      break;
      case "photo":
        if (value && value.size > 2 * 1024 * 1024) error = "File size must be less than 2MB";
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    let fieldValue;
    if (files) {
      fieldValue = files[0];
    } else {
      fieldValue = value;
    }
    
    setData(prev => ({ ...prev, [name]: fieldValue }));
    
    // Validate the field in real-time
    const error = validateField(name, fieldValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  useEffect(() => {
    // Check if all required fields are filled and no errors
    const requiredFields = [
      data.fullName,
      data.dob,
      data.gender,
      data.parentName,
      data.maritalStatus,
      data.email,
      data.mobile,
      data.cardType,
      data.address,
      data.state,
      data.currentCity,
      data.pinCode
    ];
    
    const allFieldsFilled = requiredFields.every(field => field && field.toString().trim() !== "");
    const noErrors = Object.values(errors).every(error => !error);
    
    setIsFormValid(allFieldsFilled && noErrors);
  }, [data, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const newErrors = {};
    Object.keys(data).forEach(key => {
      if (key !== "photo" || data[key]) { // Only validate photo if it exists
        const error = validateField(key, data[key]);
        if (error) newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      onNext(data);
    }
  };

  return (
    <div className="multi-step-form">
    <form className="card wide-form-card" onSubmit={handleSubmit}>
      <h2>Customer Information Form</h2>
      
      <div className="form-section">
        <div className="form-row">
          <div className="form-field">
            <label>Full Name</label>
            <input 
              name="fullName" 
              value={data.fullName} 
              onChange={handleChange} 
              className={errors.fullName ? "error glitter-border" : "glitter-border"}
            />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>
          <div className="form-field">
            <label>Date of Birth</label>
            <input 
              type="date" 
              name="dob" 
              value={data.dob} 
              onChange={handleChange} 
              // className={errors.dob ? "error glitter-border" : "glitter-border"}
            />
            {errors.dob && <span className="error-message">{errors.dob}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Gender</label>
            <select
              className={`custom-dropdown glitter-border ${errors.gender ? "error" : ""}`}
              name="gender" 
              value={data.gender} 
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="error-message">{errors.gender}</span>}
          </div>
          <div className="form-field">
            <label>Father's / Mother's Name</label>
            <input 
              name="parentName" 
              value={data.parentName} 
              onChange={handleChange} 
              className={errors.parentName ? "error glitter-border" : "glitter-border"}
            />
            {errors.parentName && <span className="error-message">{errors.parentName}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Marital Status</label>
            <select 
              className={`custom-dropdown glitter-border ${errors.maritalStatus ? "error" : ""}`}
              name="maritalStatus" 
              value={data.maritalStatus} 
              onChange={handleChange}
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
            {errors.maritalStatus && <span className="error-message">{errors.maritalStatus}</span>}
          </div>
          <div className="form-field">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={data.email} 
              onChange={handleChange} 
              className={errors.email ? "error glitter-border" : "glitter-border"}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Mobile Number</label>
            <input 
              name="mobile" 
              value={data.mobile} 
              onChange={handleChange} 
              className={errors.mobile ? "error glitter-border" : "glitter-border"}
              maxLength="10"
            />
            {errors.mobile && <span className="error-message">{errors.mobile}</span>}
          </div>
          <div className="form-field">
            <label>Card Type</label>
            <select
  className={`custom-dropdown glitter-border ${errors.cardType ? "error" : ""}`}
  name="cardType" 
  value={data.cardType} 
  onChange={handleChange}
>
  <option value="">Select Card Type</option>
  <option value="Breeze">Breeze Card</option>
  <option value="Evergreen">Evergreen Card</option>
  <option value="Ultimatum">Ultimatum Card</option>
  <option value="Platinum">Platinum Card</option>
</select>
            {errors.cardType && <span className="error-message">{errors.cardType}</span>}
          </div>
        </div>

        <div className="form-field full-width">
          <label>Residential Address</label>
          <textarea 
            name="address" 
            value={data.address} 
            onChange={handleChange} 
            className={errors.address ? "error glitter-border" : "glitter-border"}
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>State</label>
            <input 
              name="state" 
              value={data.state} 
              onChange={handleChange} 
              className={errors.state ? "error glitter-border" : "glitter-border"}
            />
            {errors.state && <span className="error-message">{errors.state}</span>}
          </div>
          <div className="form-field">
            <label>Current City</label>
            <input 
              name="currentCity" 
              value={data.currentCity} 
              onChange={handleChange} 
              className={errors.currentCity ? "error glitter-border" : "glitter-border"}
            />
            {errors.currentCity && <span className="error-message">{errors.currentCity}</span>}
        </div>
        </div>

        <div className="form-field full-width">
          <label>Current Pin Code</label>
          <input 
            name="pinCode" 
            value={data.pinCode} 
            onChange={handleChange} 
            className={errors.pinCode ? "error glitter-border" : "glitter-border"}
            maxLength="6"
          />
          {errors.pinCode && <span className="error-message">{errors.pinCode}</span>}
        </div>

        <div className="form-field full-width">
          <label>Upload Photograph (Max 2MB)</label>
          <div className="file-upload">
            <input 
              type="file" 
              name="photo" 
              id="photo-upload" 
              accept="image/*" 
              onChange={handleChange} 
            />
            <label htmlFor="photo-upload" className="file-upload-btn">Choose File</label>
            <span className="file-name">{data.photo ? data.photo.name : "No file chosen"}</span>
            {errors.photo && <span className="error-message">{errors.photo}</span>}
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className={`form-submit-btn ${isFormValid ? "" : "disabled"}`}
        disabled={!isFormValid}
      >
        Next
      </button>
    </form>
    </div>
  );
}

// Step2 Component
function Step2({ onBack, onSubmit, defaultData }) {
  const [data, setData] = useState({
    panNumber: defaultData.panNumber || "",
    aadhaarNumber: defaultData.aadhaarNumber || "",
    panFile: defaultData.panFile || null,
    aadhaarFile: defaultData.aadhaarFile || null,
    dlNumber: defaultData.dlNumber || "",
    dlFile: defaultData.dlFile || null,
    employmentType: defaultData.employmentType || "",
    annualIncome: defaultData.annualIncome || "",
    additionalDocs: defaultData.additionalDocs || null,
    companyName: defaultData.companyName || "",
    agree: defaultData.agree || false,
  });

  const [errors, setErrors] = useState({});

  const validatePAN = (pan) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(pan);
  };

  const validateAadhaar = (aadhaar) => {
    const aadhaarRegex = /^[2-9]{1}[0-9]{3}\s?[0-9]{4}\s?[0-9]{4}$/;
    return aadhaarRegex.test(aadhaar);
  };

  const validateDL = (dl) => {
    if (!dl) return true; // DL is optional
    const dlRegex = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
    return dlRegex.test(dl);
  };

  const validateFile = (file, allowedTypes, maxSizeMB) => {
    if (!file) return false;
    if (!allowedTypes.includes(file.type)) return false;
    if (file.size > maxSizeMB * 1024 * 1024) return false;
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    if (type === "checkbox") {
      setData({ ...data, [name]: checked });
    } else if (files) {
      setData({ ...data, [name]: files[0] });
    } else {
      // Apply uppercase for PAN number as user types
      if (name === "panNumber") {
        setData({ ...data, [name]: value.toUpperCase() });
      } else {
        setData({ ...data, [name]: value });
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // PAN Number validation
    if (!data.panNumber) {
      newErrors.panNumber = "PAN Number is required";
      isValid = false;
    } else if (!validatePAN(data.panNumber)) {
      newErrors.panNumber = "Invalid PAN Number format (e.e., ABCDE1234F)";
      isValid = false;
    }

    // Aadhaar Number validation
    if (!data.aadhaarNumber) {
      newErrors.aadhaarNumber = "Aadhaar Number is required";
      isValid = false;
    } else if (!validateAadhaar(data.aadhaarNumber)) {
      newErrors.aadhaarNumber = "Invalid Aadhaar Number (12 digits, should start with 2-9)";
      isValid = false;
    }

    // PAN File validation
    if (!data.panFile) {
      newErrors.panFile = "PAN Card copy is required";
      isValid = false;
    } else if (!validateFile(data.panFile, ["image/jpeg", "image/png", "application/pdf"], 2)) {
      newErrors.panFile = "Invalid file (JPEG/PNG/PDF, max 2MB)";
      isValid = false;
    }

    // Aadhaar File validation
    if (!data.aadhaarFile) {
      newErrors.aadhaarFile = "Aadhaar Card copy is required";
      isValid = false;
    } else if (!validateFile(data.aadhaarFile, ["image/jpeg", "image/png", "application/pdf"], 2)) {
      newErrors.aadhaarFile = "Invalid file (JPEG/PNG/PDF, max 2MB)";
      isValid = false;
    }

    // DL Number validation (optional)
    if (data.dlNumber && !validateDL(data.dlNumber)) {
      newErrors.dlNumber = "Invalid Driving License format";
      isValid = false;
    }

    // DL File validation (if DL number provided)
    if (data.dlNumber && !data.dlFile) {
      newErrors.dlFile = "Driving License copy is required when DL number is provided";
      isValid = false;
    } else if (data.dlFile && !validateFile(data.dlFile, ["image/jpeg", "image/png", "application/pdf"], 2)) {
      newErrors.dlFile = "Invalid file (JPEG/PNG/PDF, max 2MB)";
      isValid = false;
    }

    // Employment Type validation
    if (!data.employmentType) {
      newErrors.employmentType = "Employment type is required";
      isValid = false;
    }

    // Annual Income validation
    if (!data.annualIncome) {
      newErrors.annualIncome = "Annual income is required";
      isValid = false;
    } else if (isNaN(data.annualIncome)) {
      newErrors.annualIncome = "Annual income must be a number";
      isValid = false;
    } else if (Number(data.annualIncome) <= 0) {
      newErrors.annualIncome = "Annual income must be positive";
      isValid = false;
    }

    // Company Name validation (if salaried)
    if (data.employmentType === "Salaried" && !data.companyName) {
      newErrors.companyName = "Company name is required for salaried individuals";
      isValid = false;
    }

    // Additional docs validation (if file is provided)
    if (data.additionalDocs && !validateFile(data.additionalDocs, ["image/jpeg", "image/png", "application/pdf"], 5)) {
      newErrors.additionalDocs = "Invalid file (JPEG/PNG/PDF, max 5MB)";
      isValid = false;
    }

    // Terms agreement validation
    if (!data.agree) {
      newErrors.agree = "You must agree to the terms";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleBackClick = () => onBack(data);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(data);
    }
  };

  return (
    <div className="multi-step-form">
    <form className="card" onSubmit={handleSubmitClick}>
      <h2>Customer Information Form</h2>
      
      <div className="form-section">
        <div className="form-row">
          <div className="form-field">
            <label>PAN Card Number</label>
            <input 
              name="panNumber" 
              value={data.panNumber} 
              onChange={handleChange} 
              maxLength="10"
              placeholder="ABCDE1234F"
              className={errors.panNumber ? "error glitter-border" : "glitter-border"}
            />
            {errors.panNumber && <span className="error-message">{errors.panNumber}</span>}
          </div>
          <div className="form-field">
            <label>Aadhaar Card Number</label>
            <input 
              name="aadhaarNumber" 
              value={data.aadhaarNumber} 
              onChange={handleChange} 
              maxLength="12"
              placeholder="1234 5678 9012"
              className={errors.aadhaarNumber ? "error glitter-border" : "glitter-border"}
            />
            {errors.aadhaarNumber && <span className="error-message">{errors.aadhaarNumber}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Upload PAN Card (JPEG/PNG/PDF, max 2MB)</label>
            <div className="file-upload">
              <input 
                type="file" 
                name="panFile" 
                id="pan-upload" 
                onChange={handleChange} 
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <label htmlFor="pan-upload" className="file-upload-btn">Choose File</label>
              <span className={`file-name ${errors.panFile ? "error" : ""}`}>
                {data.panFile ? data.panFile.name : "No file chosen"}
              </span>
            </div>
            {errors.panFile && <span className="error-message">{errors.panFile}</span>}
          </div>
          <div className="form-field">
            <label>Upload Aadhaar Card (JPEG/PNG/PDF, max 2MB)</label>
            <div className="file-upload">
              <input 
                type="file" 
                name="aadhaarFile" 
                id="aadhaar-upload" 
                onChange={handleChange} 
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <label htmlFor="aadhaar-upload" className="file-upload-btn">Choose File</label>
              <span className={`file-name ${errors.aadhaarFile ? "error" : ""}`}>
                {data.aadhaarFile ? data.aadhaarFile.name : "No file chosen"}
              </span>
            </div>
            {errors.aadhaarFile && <span className="error-message">{errors.aadhaarFile}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Driving License Number (optional)</label>
            <input 
              name="dlNumber" 
              value={data.dlNumber} 
              onChange={handleChange} 
              placeholder="DL-0120191234567"
              className={errors.dlNumber ? "error glitter-border" : "glitter-border"}
            />
            {errors.dlNumber && <span className="error-message">{errors.dlNumber}</span>}
          </div>
          <div className="form-field">
            <label>Employment Type</label>
            <select 
              className={`custom-dropdown glitter-border ${errors.employmentType ? "error" : ""}`} 
              name="employmentType" 
              value={data.employmentType} 
              onChange={handleChange}
            >
              <option value="">Select Employment Type</option>
              <option value="Salaried">Salaried</option>
              <option value="Self-Employed">Self-Employed</option>
            </select>
            {errors.employmentType && <span className="error-message">{errors.employmentType}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Upload Driving License (JPEG/PNG/PDF, max 2MB)</label>
            <div className="file-upload">
              <input 
                type="file" 
                name="dlFile" 
                id="dl-upload" 
                onChange={handleChange} 
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <label htmlFor="dl-upload" className="file-upload-btn">Choose File</label>
              <span className={`file-name ${errors.dlFile ? "error" : ""}`}>
                {data.dlFile ? data.dlFile.name : "No file chosen"}
              </span>
            </div>
            {errors.dlFile && <span className="error-message">{errors.dlFile}</span>}
          </div>
          <div className="form-field">
            <label>Annual Income (₹)</label>
            <input 
              name="annualIncome" 
              value={data.annualIncome} 
              onChange={handleChange} 
              type="number"
              className={errors.annualIncome ? "error glitter-border" : "glitter-border"}
            />
            {errors.annualIncome && <span className="error-message">{errors.annualIncome}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Upload Additional Documents (JPEG/PNG/PDF, max 5MB)</label>
            <div className="file-upload">
              <input 
                type="file" 
                name="additionalDocs" 
                id="docs-upload" 
                onChange={handleChange} 
                accept=".jpg,.jpeg,.png,.pdf"
              />
              <label htmlFor="docs-upload" className="file-upload-btn">Choose File</label>
              <span className={`file-name ${errors.additionalDocs ? "error" : ""}`}>
                {data.additionalDocs ? data.additionalDocs.name : "No file chosen"}
              </span>
            </div>
            {errors.additionalDocs && <span className="error-message">{errors.additionalDocs}</span>}
          </div>
          <div className="form-field">
            <label>Company Name (If Salaried)</label>
            <input 
              name="companyName" 
              value={data.companyName} 
              onChange={handleChange} 
              className={errors.companyName ? "error glitter-border" : "glitter-border"}
              disabled={data.employmentType !== "Salaried"}
            />
            {errors.companyName && <span className="error-message">{errors.companyName}</span>}
          </div>
        </div>

        <div className="form-checkbox">
          <input 
            type="checkbox" 
            name="agree" 
            id="agree-terms" 
            checked={data.agree} 
            onChange={handleChange} 
            className={errors.agree ? "error" : ""}
          />
          <label htmlFor="agree-terms">I agree to Terms & Conditions and authorize verification.</label>
          {errors.agree && <span className="error-message">{errors.agree}</span>}
        </div>
      </div>

      <div className="form-navigation">
        <button type="button" onClick={handleBackClick} className="form-back-btn">Back</button>
        <button type="submit" className="form-submit-btn">Submit</button>
      </div>
    </form>
    </div>
  );
}

function Step3({ formData, onEdit, onSubmit }) {
  const formatFileInfo = (file) => {
    return file ? `${file.name} (${Math.round(file.size / 1024)} KB)` : 'Not uploaded';
  };

  return (
    <div className="multi-step-form">
   <div className="card">
      <h2>Review Your Information</h2>
      
      <div className="summary-section">
        {/* Personal Information Column */}
        <div className="summary-column">
          <h3>Personal Information</h3>
           {/* Photo preview if available */}
          {formData.photo && (
            <div className="summary-item">
              <strong>Photograph:</strong>
              <div style={{ marginTop: '10px', textAlign: 'center' }}>
                <img 
                  src={URL.createObjectURL(formData.photo)} 
                  alt="Uploaded" 
                  style={{ 
                    maxWidth: '150px', 
                    maxHeight: '150px', 
                    borderRadius: '8px',
                    border: '1px solid var(--muted)'
                  }} 
                />
              </div>
            </div>
          )}
          <div className="summary-item">
            <strong>Full Name:</strong> {formData.fullName}
          </div>
          <div className="summary-item">
            <strong>Date of Birth:</strong> {formData.dob}
          </div>
          <div className="summary-item">
            <strong>Gender:</strong> {formData.gender}
          </div>
          <div className="summary-item">
            <strong>Parent's Name:</strong> {formData.parentName}
          </div>
          <div className="summary-item">
            <strong>Marital Status:</strong> {formData.maritalStatus}
          </div>
          <div className="summary-item">
            <strong>Email:</strong> {formData.email}
          </div>
          <div className="summary-item">
            <strong>Mobile:</strong> {formData.mobile}
          </div>
          <div className="summary-item">
            <strong>Card Type:</strong> {formData.cardType}
          </div>
          <div className="summary-item" style={{ marginTop: '20px' }}>
  <strong>Credit Card:</strong>
  <div style={{ 
    marginTop: '10px', 
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div style={{
      width: '300px',
      height: '190px',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <img 
        src={
          formData.cardType === "Breeze" ? breezeCard :
          formData.cardType === "Evergreen" ? evergreenCard :
          formData.cardType === "Ultimatum" ? ultimatumCard :
          formData.cardType === "Platinum" ? platinumCard :
          atmCardImage // fallback to original image if none selected
        } 
        alt={`${formData.cardType || 'Default'} Credit Card`} 
        style={{ 
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }} 
      />
    </div>
  </div>
</div>
          
         
        </div>

        {/* Address & Document Information Column */}
        <div className="summary-column">
          <h3>Address Information</h3>
          <div className="summary-item">
            <strong>Address:</strong> {formData.address}
          </div>
          <div className="summary-item">
            <strong>State:</strong> {formData.state}
          </div>
          <div className="summary-item">
            <strong>City:</strong> {formData.currentCity}
          </div>
          <div className="summary-item">
            <strong>Pin Code:</strong> {formData.pinCode}
          </div>
          
          <h3>Document Information</h3>
          <div className="summary-item">
            <strong>PAN Number:</strong> {formData.panNumber}
          </div>
          <div className="summary-item">
            <strong>PAN File:</strong> {formatFileInfo(formData.panFile)}
          </div>
          <div className="summary-item">
            <strong>Aadhaar Number:</strong> {formData.aadhaarNumber}
          </div>
          <div className="summary-item">
            <strong>Aadhaar File:</strong> {formatFileInfo(formData.aadhaarFile)}
          </div>
          {formData.dlNumber && (
            <div className="summary-item">
              <strong>DL Number:</strong> {formData.dlNumber}
            </div>
          )}
          {formData.dlFile && (
            <div className="summary-item">
              <strong>DL File:</strong> {formatFileInfo(formData.dlFile)}
            </div>
          )}
          <div className="summary-item">
            <strong>Employment Type:</strong> {formData.employmentType}
          </div>
          <div className="summary-item">
            <strong>Annual Income:</strong> ₹{formData.annualIncome}
          </div>
          {formData.companyName && (
            <div className="summary-item">
              <strong>Company Name:</strong> {formData.companyName}
            </div>
          )}
        </div>
      </div>

      <div className="form-navigation">
        <button type="button" onClick={onEdit} className="form-back-btn">
          Edit Information
        </button>
        <button type="button" onClick={onSubmit} className="form-submit-btn">
          Confirm & Submit
        </button>
      </div>
    </div>
    </div>
  );
}


















// Main MultiStepForm Component
export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  // const [theme, setTheme] = useState('dark');
  const navigate = useNavigate();
  const totalSteps = 3; // Changed from 2 to 3

  // useEffect(() => {
  //   document.body.className = theme;
  // }, [theme]);

  // const toggleTheme = () => {
  //   setTheme(theme === 'dark' ? 'light' : 'dark');
  // };

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handleBack = (data) => {
    setFormData({ ...formData, ...data });
    setStep(step - 1);
  };

  const handleSubmit = (data) => {
    const finalData = { ...formData, ...data };
    setFormData(finalData);
    setStep(3); // Go to summary step instead of alerting
  };
  // const handleConfirm = () => {
  //   console.log("Submitted Data:", formData);
  //   alert("Form submitted successfully!");
  //   // Here you would typically send the data to your backend
  //   navigate('/');
  // };
  const handleEdit = () => {
    setStep(1); // Go back to first step to edit
  };
  




// Add this function to convert files to base64
// const toBase64 = file => new Promise((resolve, reject) => {
//   const reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = () => resolve(reader.result);
//   reader.onerror = error => reject(error);
// });

// Update the handleConfirm function
const handleConfirm = async () => {
  try {
    // Create FormData object (renamed to avoid conflict with state)
    const submitFormData = new FormData();
    
    // Append all text fields
    submitFormData.append('fullName', formData.fullName);
    submitFormData.append('dob', formData.dob);
    submitFormData.append('gender', formData.gender);
    submitFormData.append('parentName', formData.parentName);
    submitFormData.append('maritalStatus', formData.maritalStatus);
    submitFormData.append('email', formData.email);
    submitFormData.append('mobile', formData.mobile);
    submitFormData.append('cardType', formData.cardType);
    submitFormData.append('address', formData.address);
    submitFormData.append('state', formData.state);
    submitFormData.append('currentCity', formData.currentCity);
    submitFormData.append('pinCode', formData.pinCode);
    submitFormData.append('panNumber', formData.panNumber);
    submitFormData.append('aadhaarNumber', formData.aadhaarNumber);
    submitFormData.append('dlNumber', formData.dlNumber || '');
    submitFormData.append('employmentType', formData.employmentType);
    submitFormData.append('annualIncome', formData.annualIncome);
    submitFormData.append('companyName', formData.companyName || '');
    
    // Append files
    submitFormData.append('photo', formData.photo);
    submitFormData.append('panFile', formData.panFile);
    submitFormData.append('aadhaarFile', formData.aadhaarFile);
    
    if (formData.dlFile) {
      submitFormData.append('dlFile', formData.dlFile);
    }
    
    if (formData.additionalDocs) {
      submitFormData.append('additionalDocs', formData.additionalDocs);
    }
    
    // Send data to backend
    const response = await fetch('http://localhost:8080/api/forms', {
      method: 'POST',
      body: submitFormData,
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Success:', result);
      alert('Form submitted successfully!');
      navigate('/');
    } else {
      const errorText = await response.text();
      console.error('Error:', response.status, errorText);
      alert('Failed to submit form. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while submitting the form.');
  }
};
   return (
    <div className="multi-step-form">
      {/* <StandardCharteredNavbar toggleTheme={toggleTheme} currentTheme={theme} /> */}
      <div className="app" style={{ paddingTop: "140px", paddingBottom: "40px" }}>
        <ProgressBar currentStep={step} totalSteps={totalSteps} />
        {step === 1 && <Step1 onNext={handleNext} defaultData={formData} />}
        {step === 2 && (
          <Step2
            onBack={handleBack}
            onSubmit={handleSubmit}
            defaultData={formData}
          />
        )}
        {step === 3 && (
          <Step3
            formData={formData}
            onEdit={handleEdit}
            onSubmit={handleConfirm}
          />
        )}
      </div>
    </div>
  );
}