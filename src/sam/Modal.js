// src/Modal.js

import React, { useState, useEffect } from 'react';
import { initials } from './helpers.js';

const Modal = ({ theme,content, onClose, onAddCustomer, onUpdateCustomer, onUpdateApprovalTag, toast, customers, approvals }) => {
    const [formData, setFormData] = useState({});
    const [isNew, setIsNew] = useState(false);

    useEffect(() => {
        if (content.type === 'customer') {
            if (content.customer) {
                // Editing existing customer
                setFormData({
                    ...content.customer,
                    tag: content.correspondingApproval?.flags?.[0] || ''
                });
                setIsNew(false);
            } else {
                // Adding new customer
                setFormData({
                    name: '',
                    email: '',
                    customerStatus: 'Active',
                    creditLimit: '',
                    address: '',
                    notes: '',
                    id: '',
                    issued: new Date().toISOString().slice(0, 10),
                    tag: ''
                });
                setIsNew(true);
            }
        }
    }, [content]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSave = () => {
    // 1. Basic email format validation (runs for both add & edit)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        toast('Please provide a valid email address.');
        return;
    }

    // 2. Universal duplicate email check using the correct unique ID
    if (Array.isArray(approvals) && formData.email) {
        const normalizedEmail = formData.email.trim().toLowerCase();
        let emailExists;

        if (isNew) {
            // In "Add" mode, check if the email exists anywhere.
            emailExists = approvals.some(
                app => app.email && app.email.trim().toLowerCase() === normalizedEmail
            );
        } else {
            // In "Edit" mode, use the unique application ID to exclude the current record from the check.
            const currentApprovalId = content.correspondingApproval ? content.correspondingApproval.id : null;
            emailExists = approvals.some(
                app =>
                app.id !== currentApprovalId &&
                app.email &&
                app.email.trim().toLowerCase() === normalizedEmail
            );
        }

        if (emailExists) {
            toast('This email address is already in use by another customer.');
            return;
        }
    }

    // 3. Logic specific to "Add New" mode
    if (isNew) {
      const requiredFields = ['name', 'id', 'customerStatus', 'creditLimit', 'issued', 'email', 'address'];
      const missingField = requiredFields.find(field => !formData[field]);

      if (missingField) {
        const fieldName = missingField === 'id' ? 'Customer ID' : missingField.charAt(0).toUpperCase() + missingField.slice(1);
        toast(`${fieldName} is required.`);
        return;
      }

      const newCid = `#CU-${formData.id}`;
      if (customers.some(c => c.id === newCid)) {
        toast('This Customer ID already exists.');
        return;
      }
      
      const newCustomer = {
          id: newCid,
          name: formData.name,
          creditLimit: parseInt(formData.creditLimit, 10) || 0,
          customerStatus: formData.customerStatus,
          issued: formData.issued,
          email: formData.email,
          address: formData.address,
          notes: formData.notes
      };
      const newApproval = {
          id: `#CC-${Math.floor(100000 + Math.random() * 900000)}`,
          name: formData.name,
          email: formData.email,
          creditLimit: parseInt(formData.creditLimit, 10) || 0,
          score: Math.floor(600 + Math.random() * 150),
          flags: formData.tag ? [formData.tag] : [],
          submitted: new Date().toISOString(),
          customerStatus: 'pending',
          notes: ['New application created alongside customer.']
      };
      onAddCustomer(newCustomer, newApproval);
      toast('New customer and application added!');

    // 4. Logic specific to "Edit" mode
    } else {
      const updatedCustomerData = { ...formData };
      onUpdateCustomer(updatedCustomerData);
      onUpdateApprovalTag(formData.name, formData.tag);
      //toast('Customer details updated');
    }

    onClose();
  };

    const renderContent = () => {
        if (content.type === 'confirm') {
            return (
                <>
                    <h3>Confirm</h3>
                    <div style={{ padding: '8px 0' }}>{content.message}</div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                        <button className="btn ghost" onClick={onClose}>Cancel</button>
                        <button className="btn" onClick={() => { content.onConfirm(); onClose(); }}>Confirm</button>
                    </div>
                </>
            );
        }

        if (content.type === 'customer') {
            const availableTags = ['Salary Verified', 'KYC Missing', 'High Risk', 'Low Credit Util.'];
            return (
                <div classname="agent-portal">
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3>{isNew ? 'Add New Customer' : 'Edit Customer'}</h3>
                        <div className="close-x" role="button" aria-label="Close" onClick={onClose}>&times;</div>
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '10px', background: 'linear-gradient(135deg,var(--sc-blue),var(--sc-green))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: 'white', fontSize: '20px' }}>
                                {isNew ? '??' : initials(formData.name)}
                            </div>
                            <div style={{ flex: 1 }}>
                                <label className="small muted">Name</label>
                                <input id="name" value={formData.name || ''} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'transparent', border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.03)', color: 'inherit', fontSize: '14px' }} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                            <div>
                                <label className="small muted">Customer ID</label>
                                {isNew ? (
                                    <div style={{ display: 'flex', alignItems: 'center', background: 'transparent', border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                                        <span style={{ padding: '0 8px', color: 'var(--muted-text)', fontWeight: 600 }}>#CU-</span>
                                        <input id="id" value={formData.id || ''} onChange={handleChange} placeholder="1005" style={{ width: '100%', border: 'none', background: 'transparent', color: 'inherit', fontSize: '14px', padding: '8px 0' }} />
                                    </div>
                                ) : (
                                    <div style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'transparent', border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.03)', color: 'inherit', fontSize: '14px', opacity: 0.7 }}>{formData.id}</div>
                                )}
                            </div>
                            <div>
                                <label className="small muted">Status</label>
                                <select id="customerStatus" value={formData.customerStatus || 'Active'} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'transparent', border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.03)', color: 'inherit', fontSize: '14px', appearance: 'none' }}>
                                    <option style={{ background: 'var(--bg-end)', color: 'var(--text)' }} value="Active">Active</option>
                                    <option style={{ background: 'var(--bg-end)', color: 'var(--text)' }} value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <div>
                                <label className="small muted">Credit Limit</label>
                                <input id="creditLimit" type="number" value={formData.creditLimit || ''} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'transparent', border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.03)', color: 'inherit', fontSize: '14px' }} />
                            </div>
                            <div >
                                <label className="small muted" htmlFor="phone">Mobile Number</label>
                                <input id="phone" type="number" value={formData.phone || ''} name="phone" onChange={handleChange} style={{ width: '100%',  padding: '8px', borderRadius: '8px', background: 'transparent', border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.03)', color: 'inherit', fontSize: '14px' }}/>
                            </div>
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                            <label className="small muted">Email Address</label>
                            <input id="email" type="email" value={formData.email || ''} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'transparent', border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.03)', color: 'inherit', fontSize: '14px' }} />
                        </div>
                        <div style={{ marginBottom: '12px' }}>
                            <label className="small muted">Address</label>
                            <input id="address" value={formData.address || ''} onChange={handleChange} style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'transparent', border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.03)', color: 'inherit', fontSize: '14px' }} />
                        </div>
                        <div>
                            <label className="small muted">Notes</label>
                            <textarea id="notes" value={formData.notes || ''} onChange={handleChange} style={{ width: '100%', minHeight: '80px', padding: '8px', borderRadius: '8px', border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.04)', background: 'transparent', color: 'inherit', fontSize: '13px' }} placeholder="Add notes..."></textarea>
                        </div>
                        <div style={{ marginTop: '12px' }}>
                            <label className="small muted">Application Tag</label>
                            <div className="f-input select" style={{ width: '100%', padding: '8px', borderRadius: '8px', background: 'transparent', border: theme === 'light' ? '1px solid rgba(0,0,0,0.1)' : '1px solid rgba(255,255,255,0.03)', color: 'inherit', fontSize: '14px', marginTop: '6px' }}>
                                <select id="tag" value={formData.tag || ''} onChange={handleChange}>
                                    <option style={{ background: 'var(--bg-end)', color: 'var(--text)' }} value="">None</option>
                                    {availableTags.map(tag => <option key={tag} value={tag}style={{ background: 'var(--bg-end)', color: 'var(--text)' }}>{tag}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
                            <button className="btn" onClick={handleSave}>{isNew ? 'Add Customer & Application' : 'Save Changes'}</button>
                            <button className="btn ghost" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="overlay open" aria-hidden="false">
            <div className="modal-card">
                {renderContent()}
            </div>
        </div>
    );
};

export default Modal;