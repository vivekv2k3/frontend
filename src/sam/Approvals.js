// src/Approvals.js


import React, { useState, useMemo } from 'react';
import { fmtMoney, initials, daysAgo } from './helpers.js';

const Approvals = ({ approvals, customers, onApprovalAction, onShowConfirmModal, toast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState('newest');
  const [selectedIds, setSelectedIds] = useState(new Set());

  const inactiveCustomerNames = useMemo(() =>
    new Set(customers.filter(c => c.status === 'Inactive').map(c => c.name)),
    [customers]
  );

  const filteredAndSortedApprovals = useMemo(() => {
    let filtered = approvals.filter(a => {
      const isPending = a.applicationStatus === 'pending';
      const isFromInactiveUser = inactiveCustomerNames.has(a.name);
      // This is the new, corrected line
const searchMatch = !searchTerm || `${a.name} ${a.id} ${a.email} ${a.phone} ${(a.flags || []).join(' ')}`.toLowerCase().includes(searchTerm);

      if (searchTerm.startsWith('score:')) {
        const val = parseInt(searchTerm.split(':')[1] || '0');
        return a.score >= val && isPending && !isFromInactiveUser;
      }

      return searchMatch && isPending && !isFromInactiveUser;
    });

    return [...filtered].sort((a, b) => {
      switch (sortKey) {
        case 'scoreDesc': return b.score - a.score;
        case 'scoreAsc': return a.score - b.score;
        case 'limitDesc': return b.limit - a.limit;
        case 'newest':
        default: return new Date(b.submitted) - new Date(a.submitted);
      }
    });
  }, [approvals, inactiveCustomerNames, searchTerm, sortKey]);

  const handleSelectAll = (e) => {
    const newSelectedIds = new Set();
    if (e.target.checked) {
      filteredAndSortedApprovals.forEach(a => newSelectedIds.add(a.id));
    }
    setSelectedIds(newSelectedIds);
  };

  const handleSelectRow = (id) => {
    const newSelectedIds = new Set(selectedIds);
    if (newSelectedIds.has(id)) {
      newSelectedIds.delete(id);
    } else {
      newSelectedIds.add(id);
    }
    setSelectedIds(newSelectedIds);
  };

  const handleBulkApprove = () => {
    if (selectedIds.size === 0) {
      toast('Select at least one application to bulk approve.');
      return;
    }
    onShowConfirmModal(`Bulk approve ${selectedIds.size} applications?`, () => {
      onApprovalAction('approved', Array.from(selectedIds));
      setSelectedIds(new Set());
      toast(`Bulk approved ${selectedIds.size} applications.`);
    });
  };

  return (
    <div classname="agent-portal">
    <div className="fade ">
      <div className="topbar">
        <div>
          <div className="page-title">Approvals</div>
          <div className="subtle">Worklist — search, filter, sort & bulk actions.</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="searchbox">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            <input
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value.toLowerCase())}
              placeholder="Search name / id / phone or 'score:700'..."
            />
          </div>
          <div className="f-input select" style={{ minWidth: '160px', position: 'relative' }}>

            <select value={sortKey} onChange={e => setSortKey(e.target.value)} style={{ minWidth: '160px' }}>
              <option value="newest">Sort: Newest</option>
              <option value="scoreDesc">Score: High→Low</option>
              <option value="scoreAsc">Score: Low→High</option>
              <option value="limitDesc">Limit: High→Low</option>
            </select>
          </div>
          <button className="btn" onClick={handleBulkApprove}>Bulk Approve</button>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h3 style={{ margin: 0 }}>Pending Applications</h3>
          <div className="muted small">Select rows to perform bulk actions</div>
        </div>

        <div style={{ marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <label className="flex" style={{ gap: '8px', alignItems: 'center' }}>
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedIds.size > 0 && selectedIds.size === filteredAndSortedApprovals.length}
            />
            <span className="small muted" style={{ marginLeft: '6px' }}>Select all on page</span>
          </label>
          <button className="btn ghost" onClick={() => setSearchTerm('kyc missing')}>KYC Missing</button>
          <button className="btn ghost" onClick={() => setSearchTerm('high risk')}>High Risk</button>
          <button className="btn" onClick={() => setSearchTerm('')}>Clear</button>
        </div>

        <div className="inbox-table">
          <table>
            <thead>
              <tr><th></th><th>Applicant</th><th>ID</th><th>Requested Limit</th><th>Score</th><th>Submitted</th><th>Tags</th><th style={{textAlign: 'right', paddingRight: '80px'}}>Actions</th></tr>
            </thead>
            <tbody>
              {filteredAndSortedApprovals.map(a => (
                <tr key={a.id} className="row-hover">
                  <td><input type="checkbox" checked={selectedIds.has(a.id)} onChange={() => handleSelectRow(a.id)} /></td>
                  <td style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="avatar">{initials(a.name)}</div>
                    <div>
                      <div style={{ fontWeight: '800' }}>{a.name}</div>
                      <div className="small muted">{a.email || a.phone}</div>
                    </div>
                  </td>
                  <td>{a.id}</td>
                  <td>{fmtMoney(a.creditLimit)}</td>
                  <td><div className="pill">{a.creditScore}</div></td>
                  <td className="small muted">{daysAgo(a.submittedDate)}</td>
                  <td>{(a.flags || []).map(f => <span key={f} className="tag">{f}</span>)}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="action-btn action-approve" onClick={() => onShowConfirmModal(`Approve application ${a.id}?`, () => onApprovalAction('approved', [a.id]))}>Approve</button>
                    <button className="action-btn action-reject" onClick={() => onShowConfirmModal(`Reject application ${a.id}?`, () => onApprovalAction('rejected', [a.id]))} style={{marginLeft: '8px'}}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Approvals;