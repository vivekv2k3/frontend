// // src/Reports.js

// import React, { useState, useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const Reports = () => {
//     const chartRef = useRef(null);
//     const chartInstance = useRef(null);
//     const [insights, setInsights] = useState('Generating insights...');
//     const [filters, setFilters] = useState(() => {
//         const to = new Date();
//         const from = new Date();
//         from.setDate(to.getDate() - 29);
//         return {
//             from: from.toISOString().slice(0, 10),
//             to: to.toISOString().slice(0, 10),
//             type: 'approvals'
//         };
//     });

//     useEffect(() => {
//         drawReportChart();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [filters]);

//     const handleFilterChange = (e) => {
//         const key = e.target.id.replace('report', '').toLowerCase();
//         const value = e.target.value;
//         setFilters(prev => ({ ...prev, [key]: value }));
//     };

//     const drawReportChart = () => {
//         const { from, to, type } = filters;
//         if (new Date(to) < new Date(from)) {
//             alert('Invalid date range');
//             return;
//         }

//         let labels, data, chartType = 'line';
//         if (type === 'score') {
//             labels = ['300-499', '500-599', '600-699', '700-799', '800-850'];
//             data = labels.map(() => Math.round(Math.random() * 80));
//             chartType = 'bar';
//         } else {
//             const days = [];
//             for (let d = new Date(from); d <= new Date(to); d.setDate(d.getDate() + 1)) {
//                 days.push(new Date(d));
//             }
//             labels = days.map(d => d.toISOString().slice(0, 10));
//             data = labels.map(() => type === 'approvals' ? Math.floor(10 + Math.random() * 60) : Math.round(60 + Math.random() * 120));
//         }

//         const ctx = chartRef.current.getContext('2d');
//         if (chartInstance.current) chartInstance.current.destroy();
//         chartInstance.current = new Chart(ctx, {
//             type: chartType,
//             data: {
//                 labels,
//                 datasets: [{
//                     label: type === 'score' ? 'Approval %' : 'Value',
//                     data,
//                     fill: type !== 'score',
//                     backgroundColor: 'rgba(0,122,206,0.12)',
//                     borderColor: 'rgb(0,122,206)',
//                     tension: 0.3
//                 }]
//             },
//             // --- CHANGE 1: Added options to make the chart responsive ---
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: { legend: { display: false } },
//                 scales: { y: { beginAtZero: true } }
//             }
//         });

//         const avg = Math.round(data.reduce((s, v) => s + v, 0) / data.length);
//         if (type === 'approvals') setInsights(`Average approvals per day: <strong>${avg}</strong>.`);
//         if (type === 'decision') setInsights(`Average decision time (mins): <strong>${avg}</strong>.`);
//         if (type === 'score') setInsights(`Top bracket: <strong>${labels[data.indexOf(Math.max(...data))]}</strong>.`);
//     };

//     const exportCSV = () => {
//         if (!chartInstance.current) return;
//         const { labels, datasets } = chartInstance.current.data;
//         let csv = 'label,value\n' + labels.map((l, i) => `${l},${datasets[0].data[i]}`).join('\n');
//         const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'report.csv';
//         a.click();
//         URL.revokeObjectURL(url);
//     };

//     const downloadPNG = () => {
//         if (!chartInstance.current) return;
//         const a = document.createElement('a');
//         a.href = chartRef.current.toDataURL('image/png');
//         a.download = 'chart.png';
//         a.click();
//     };

//     return (
//         <div classname="agent-portal">
//         <div className="fade">
//             <div className="topbar">
//                 <div>
//                     <div className="page-title">Reports & Analytics</div>
//                     <div className="subtle">Charts, date filters and export options.</div>
//                 </div>
//                 <div className="report-controls">
//                     <div className="f-input"><label className="small muted" style={{ marginRight: '8px' }}>From</label><input type="date" id="reportFrom" value={filters.from} onChange={handleFilterChange} /></div>
//                     <div className="f-input"><label className="small muted" style={{ marginRight: '8px' }}>To</label><input type="date" id="reportTo" value={filters.to} onChange={handleFilterChange} /></div>
//                     <div className="f-input select" style={{ minWidth: '160px' }}>
//                         <select id="reportType" value={filters.type} onChange={handleFilterChange}>
//                             <option value="approvals">Approvals per day</option>
//                             <option value="decision">Avg decision time</option>
//                             <option value="score">Approval rate by score</option>
//                         </select>
//                     </div>
//                     <button className="btn" onClick={exportCSV}>Export CSV</button>
//                     <button className="btn ghost" onClick={downloadPNG}>Download Chart</button>
//                 </div>
//             </div>
            
//             {/* --- CHANGE 2: Wrapped the canvas in a container div for proper sizing --- */}
//             <div className="card">
//               <div style={{ position: 'relative', height: '60vh', maxHeight: '450px' }}>
//                 <canvas ref={chartRef}></canvas>
//               </div>
//             </div>

//             <div className="card" style={{ marginTop: '12px' }}>
//                 <h4 style={{ margin: '0 0 8px 0' }}>Key Insights</h4>
//                 <div className="muted small" dangerouslySetInnerHTML={{ __html: insights }}></div>
//             </div>
//         </div>
//         </div>
//     );
// };

// export default Reports;
