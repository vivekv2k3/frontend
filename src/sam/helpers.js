// src/helpers.js


export const fmtMoney = n => '₹' + (n).toLocaleString('en-IN');

export const initials = (name = '') => (name.split(' ').map(s => s[0]).slice(0, 2).join('') || 'SC').toUpperCase();

export const daysAgo = iso => {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000);
  if (diff < 24) return diff + 'h ago';
  return Math.floor(diff / 24) + 'd ago';
};

export const lastNDates = n => {
  const arr = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    arr.push(d.toISOString().slice(0, 10));
  }
  return arr;
};
