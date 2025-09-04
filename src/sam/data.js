// src/data.js

export const sampleApprovals = [
  { id:'1', name:'Akash Gupta', email:'akash.g@example.com', phone:'+91 90000 11111', limit:150000, score:720, flags:['Salary Verified','Low Credit Util.'], submitted:'2025-08-07T09:40:00Z', status:'pending', notes:['Salary verified via payroll (2 days ago)','No prior defaults'] },
  { id:'#CC-001235', name:'Ria Sharma', email:'ria.s@example.com', phone:'+91 98765 43210', limit:50000, score:650, flags:['KYC Missing'], submitted:'2025-08-07T04:10:00Z', status:'pending', notes:['KYC not uploaded'] },
  { id:'#CC-001236', name:'John Mathew', email:'john.m@example.com', phone:'+44 7700 900123', limit:80000, score:680, flags:[], submitted:'2025-08-06T13:25:00Z', status:'approved', notes:['Approved by Ritu (2 days ago)'] },
  { id:'#CC-001237', name:'Meera Iyer', email:'meera.i@example.com', phone:'+91 98980 11223', limit:120000, score:700, flags:['High Risk'], submitted:'2025-08-05T10:00:00Z', status:'pending', notes:['High risk: manual review'] }
];

export const sampleCustomers = [
  { cid:'#CU-1001', name:'Akash Gupta', limit:150000, status:'Active', issued:'2023-07-12', phone:'+91 90000 11111', email:'akash.g@example.com', address:'Chennai, India', notes: 'High-value customer. Potential for premium card upgrade.' },
  { cid:'#CU-1002', name:'Ria Sharma', limit:50000, status:'Active', issued:'2024-01-25', phone:'+91 98765 43210', email:'ria.s@example.com', address:'Bengaluru, India', notes: 'Initial application was missing KYC. Resolved on 2024-01-20.' },
  { cid:'#CU-1003', name:'John Mathew', limit:80000, status:'Inactive', issued:'2020-11-05', phone:'+44 7700 900123', email:'john.m@example.com', address:'London, UK', notes: 'Account dormant since last year. Follow up for reactivation.' },
  { cid:'#CU-1004', name:'Meera Iyer', limit:120000, status:'Active', issued:'2022-02-11', phone:'+91 98980 11223', email:'meera.i@example.com', address:'Mumbai, India', notes: '' }
];