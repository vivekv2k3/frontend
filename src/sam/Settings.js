// src/Settings.js

import React, { useState, useRef } from 'react';
import { initials } from './helpers.js';

const Settings = ({ profile, onUpdateProfile, onUpdateProfilePhoto, onToggleTheme, toast, handleSignOut }) => {
    const [formData, setFormData] = useState({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        location: profile.location
    });
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { id, value } = e.target;
        const key = id.replace('profile', '').toLowerCase();
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = () => {
        onUpdateProfile(formData);
        toast('Profile updated');
    };

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            onUpdateProfilePhoto(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const Avatar = ({ user }) => {
        const style = {
            width: '64px',
            height: '64px',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            fontWeight: '800',
            color: '#072036',
            background: 'linear-gradient(135deg, #e0eef8, #ddefee)',
            border: '1px solid var(--card-bg)' 
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
        <div className="fade">
          <div className="topbar">
            <div>
              <div className="page-title">Settings</div>
              <div className="subtle">Personalize & security</div>
            </div>
          </div>

          <div className="card">
            <h4 style={{ margin: "0 0 8px 0" }}>Profile</h4>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <label title="Click to upload a new photo">
                <Avatar user={profile} />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </label>

              <div style={{ flex: 1 }}>
                <label className="small muted">Name</label>
                <input
                  id="profileName"
                  className="f-input"
                  style={{ width: "100%" }}
                  value={formData.name}
                  onChange={handleChange}
                />

                <label
                  className="small muted"
                  style={{ marginTop: "8px", display: "block" }}
                >
                  Email
                </label>
                <input
                  id="profileEmail"
                  type="email"
                  className="f-input"
                  style={{ width: "100%" }}
                  value={formData.email}
                  onChange={handleChange}
                />

                <label
                  className="small muted"
                  style={{ marginTop: "8px", display: "block" }}
                >
                  Phone
                </label>
                <input
                  id="profilePhone"
                  type="tel"
                  className="f-input"
                  style={{ width: "100%" }}
                  value={formData.phone}
                  onChange={handleChange}
                />

                <label
                  className="small muted"
                  style={{ marginTop: "8px", display: "block" }}
                >
                  Location
                </label>
                <input
                  id="profileLocation"
                  className="f-input"
                  style={{ width: "100%" }}
                  value={formData.location}
                  onChange={handleChange}
                />

                <div
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    gap: "8px",
                    borderTop: "1px dashed var(--card-bg)",
                    paddingTop: "20px",
                  }}
                >
                  <button className="btn" onClick={handleSave}>
                    Save
                  </button>
                  <button className="btn danger" onClick={handleSignOut}>
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: "12px" }}>
            <h4 style={{ margin: "0 0 8px 0" }}>Preferences</h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: "700" }}>Theme</div>
                  <div className="small muted">Light / Dark</div>
                </div>
                <div>
                  <button className="btn" onClick={onToggleTheme}>
                    Toggle Theme
                  </button>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: "700" }}>Security</div>
                  <div className="small muted">Enable 2FA (simulated)</div>
                </div>
                <div>
                  <button className="btn">Enable 2FA</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Settings;
