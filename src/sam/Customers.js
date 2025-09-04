// src/sam/Customers.js
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fmtMoney, initials } from './helpers.js';

const Customers = ({ customers, onShowCustomerModal, onShowConfirmModal, onCustomerAction }) => {
  const [filters, setFilters] = useState({ q: '', status: 'all', limit: 'any' });
  const navigate = useNavigate(); // Initialize navigate

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      const qMatch = !filters.q || c.name.toLowerCase().includes(filters.q) || c.email.toLowerCase().includes(filters.q) || String(c.id).toLowerCase().includes(filters.q);
      const statusMatch = filters.status === 'all' || c.customerStatus.toLowerCase() === filters.status;
      const limitMatch = filters.limit === 'any' ||
        (filters.limit === 'low' && c.creditLimit < 50000) ||
        (filters.limit === 'mid' && c.creditLimit >= 50000 && c.creditLimit <= 120000) ||
        (filters.limit === 'high' && c.creditLimit > 120000);
      return qMatch && statusMatch && limitMatch;
    });
  }, [customers, filters]);

  const handleDelete = (c) => {
    onShowConfirmModal(
        <>Delete {c.name} ({c.id})? <br/><strong style={{color:'var(--danger)'}}>This action cannot be undone.</strong></>,
        () => onCustomerAction.delete(c.id)
    );
  };
  
  // New handler for the "Add Customer" button
  const handleAddCustomer = () => {
    navigate('/apply');
  };

  return (
    <div className="agent-portal">
    <div className="fade">
      <div className="topbar">
        <div>
          <div className="page-title">Customers</div>
          <div className="subtle">View and manage customers. Click "Detail" to open a card.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Updated onClick handler */}
          <button className="btn" onClick={handleAddCustomer}>Add Customer</button>
          <div className="f-input" style={{ minWidth: '240px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            <input name="q" value={filters.q} onChange={handleFilterChange} placeholder="Search customers..." />
          </div>
          <div className="f-input select" style={{ minWidth: '160px' }}>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="all">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="f-input select" style={{ minWidth: '140px' }}>
            <select name="limit" value={filters.limit} onChange={handleFilterChange}>
              <option value="any">All limits</option><option value="low">&lt;₹50k</option><option value="mid">₹50k–₹120k</option><option value="high">&gt;₹120k</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <table>
          <thead><tr><th>Name</th><th>ID</th><th>Limit</th><th>Status</th><th>Email</th><th>Location</th><th style={{textAlign: 'right', paddingRight: '80px'}}>Actions</th></tr></thead>
          <tbody>
            {filteredCustomers.map(c => (
              <tr key={c.id}>
                <td style={{ fontWeight: '800', display: 'flex', alignItems: 'center' }}>
                  <div className="avatar" style={{ width: '36px', height: '36px', fontSize: '14px', marginRight: '10px' }}>{initials(c.name)}</div>
                  <div>{c.name}</div>
                </td>
                <td>{c.id}</td>
                <td>{fmtMoney(c.creditLimit)}</td>
                <td>{c.customerStatus}</td>
                <td className="small muted">{c.email}</td>
                <td className="small muted">{(c.address || '')}</td>
                <td style={{ textAlign: 'right' }}>
                  <button className="action-btn action-detail" onClick={() => onShowCustomerModal(c)}>Detail</button>
                  <button className="action-btn action-delete" onClick={() => handleDelete(c)} style={{marginLeft: '8px'}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Customers;