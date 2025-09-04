// src/Dashboard.js

import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { fmtMoney, initials, daysAgo, lastNDates } from './helpers.js';

const Dashboard = ({ approvals, customers, userActivity, onShowCustomerModal }) => {  
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('all');

  const pending = approvals.filter(a => a.applicationStatus === 'pending').length;
  const approvedCount = customers.filter(c => c.applicationStatus === 'approved').length;
  const risks = approvals.filter(a => (a.flags || []).includes('High Risk')).length;
  const avgDecision = '2h 14m';

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      const labels = lastNDates(7);
      const approvalsPerDay = labels.map(() => Math.floor(10 + Math.random() * 50));
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label: 'Approvals',
            data: approvalsPerDay,
            fill: true,
            tension: 0.35,
            backgroundColor: 'rgba(7,114,206,0.12)',
            borderColor: 'rgb(7,114,206)',
            pointRadius: 3
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true }, x: { ticks: { maxRotation: 0 } } }
        }
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const filteredApprovals = approvals.filter(a => {
        //const textContent = `${a.name} ${a.id} ${a.flags.join(' ')}`.toLowerCase();
        const textContent = `${a.name} ${a.id} ${a.email} ${(a.flags || []).join(' ')}`.toLowerCase();
        const searchMatch = !searchTerm || textContent.includes(searchTerm.toLowerCase());
        //const filterMatch = filterTerm === 'all' || textContent.includes(filterTerm.toLowerCase().replace(/ /g, ''));
        const filterMatch = filterTerm === 'all' || textContent.includes(filterTerm.toLowerCase());
        return a.applicationStatus === 'pending' && searchMatch && filterMatch;
        //return searchMatch && filterMatch;
    })
    .slice(0, 5);
  const handleRowClick = (approval) => {
    const customer = customers.find(c => c.name === approval.name);
    if (customer) {
      onShowCustomerModal(customer);
    }
  };
  return (
    <div classname="agent-portal">
    <div className="fade">
      <div className="topbar">
        <div>
          <div className="page-title">Credit Card Approvals — Dashboard</div>
          <div className="subtle">Overview and quick actions for approvers.</div>
        </div>
      </div>

      <section className="kpis">
        <div className="card kpi"><div className="label">Pending Approvals</div><div className="value">{pending}</div><div className="small muted">Updated just now</div></div>
        <div className="card kpi"><div className="label">Avg Decision Time</div><div className="value">{avgDecision}</div><div className="small muted">-12% vs last week</div></div>
        <div className="card kpi"><div className="label">Approved (total)</div><div className="value">{approvedCount}</div><div className="small muted">Since last sync</div></div>
        <div className="card kpi"><div className="label">High Risk Flags</div><div className="value">{risks}</div><div className="small muted" style={{ color: 'var(--danger)' }}>Review required</div></div>
      </section>

      <div className="content-grid">
        <div>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0 }}>Inbox — Recent Applications</h3>
              <div className="muted small">Showing latest {filteredApprovals.length}</div>
            </div>

            <div className="filter-bar" style={{ marginBottom: '12px' }}>
              <div className="f-input select" style={{ minWidth: '160px' }}>
                <select value={filterTerm} onChange={e => setFilterTerm(e.target.value)}>
                  <option value="all">All</option>
                  <option value="kyc missing">KYC Missing</option>
                  <option value="high risk">High Risk</option>
                  <option value="salary verified">Salary Verified</option>
                </select>
              </div>
              <div className="f-input" style={{ minWidth: '260px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Quick search applicants..." />
              </div>
              <div className="pill small muted">Tip: click a row to open details</div>
            </div>

            <div className="inbox-table">
              <table>
                <thead>
                  {/* --- CHANGE 1: Removed the "Actions" header --- */}
                  <tr>
                    <th style={{textAlign: 'left'}}>Applicant</th>
                    <th style={{textAlign: 'left'}}>ID</th>
                    <th style={{textAlign: 'left'}}>Limit</th>
                    <th style={{textAlign: 'left'}}>Score</th>
                    <th style={{textAlign: 'left'}}>Submitted</th>
                    <th style={{textAlign: 'left'}}>Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApprovals.map(a => (
                    <tr key={a.id} className="row-hover"onClick={() => handleRowClick(a)} style={{ cursor: 'pointer' }}>
                      <td style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="avatar">{initials(a.name)}</div>
                        <div>
                          <div style={{ fontWeight: '800' }}>{a.name}</div>
                          <div className="small muted">{a.email}</div>
                        </div>
                      </td>
                      <td>{a.id}</td>
                      <td>{fmtMoney(a.creditLimit)}</td>
                      <td><span className="tag">Score: {a.creditScore}</span></td>
                      <td className="small muted">{daysAgo(a.submittedDate)}</td>
                      <td>{(a.flags || []).map(f => <span key={f} className="tag">{f}</span>)}</td>
                      {/* --- CHANGE 2: The entire table cell (<td>) with the buttons has been removed --- */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div>
          {/* <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h4 style={{ margin: 0 }}>Approvals — Last 7 days</h4>
              <div className="small muted">Auto-generated trend</div>
            </div>
            <canvas ref={chartRef} height="160"></canvas>
          </div> */}
          <div className="card" style={{ marginTop: '12px' }}>
            <h4 style={{ margin: '0 0 10px 0' }}>My Recent Activity</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
              {userActivity.length === 0 ? (
                <div className="muted small">Approve or reject an application to see your activity here.</div>
              ) : (
                userActivity.map((item, index) => {
                  const actionColor = item.action === 'Approved' ? 'var(--success)' : 'var(--danger)';
                  return (
                    <div key={index} className="small muted" style={{ paddingBottom: '8px', borderBottom: '1px dashed rgba(255,255,255,0.03)' }}>
                      <div><strong style={{ color: actionColor }}>{item.action}</strong> {item.name} ({item.id})</div>
                      <div style={{ fontSize: '11px', opacity: '0.7' }}>{item.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
