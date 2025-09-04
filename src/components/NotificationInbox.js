
import React from "react";

const notifications = [
  {
    step: "Card Printed",
    description: "Your credit card has been printed and is ready for shipping.",
    time: "12 Aug 2025, 14:30 IST",
    icon: "🖨️"
  },
  {
    step: "Shipped",
    description: "Your card has left our facility with BlueDart.",
    time: "12 Aug 2025, 15:15 IST",
    icon: "🚚"
  },
  {
    step: "Tracking ID Generated",
    description: "Tracking ID: BD78654321",
    time: "12 Aug 2025, 15:30 IST",
    icon: "🔗"
  },
  {
    step: "Out for Delivery",
    description: "Courier is out for delivery.",
    time: "13 Aug 2025, 09:00 IST",
    icon: "📦"
  }
];

export default function NotificationInbox() {
  return (
    <div style={styles.inboxWrapper}>
      {notifications.map((notif, idx) => (
        <div key={idx} style={styles.notifRow}>
          <span style={styles.icon}>{notif.icon}</span>
          <div style={styles.notifContent}>
            <div style={styles.step}>{notif.step}</div>
            <div style={styles.description}>{notif.description}</div>
            <div style={styles.time}>{notif.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  inboxWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",   // <-- centers all notification rows horizontally
    justifyContent: "center",
    width: "100%",
  },
  notifRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    justifyContent: "center",     // <--- center each notification row
    background: "none",           // no inner box!
    borderRadius: 0,
    width: "80%",                 // width of row; change to "100%" if you want it close to modal edges
    color: "#fff",
    margin: "0 0 10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.12)"
  },
  icon: {
    fontSize: 24,
  },
  notifContent: {
    textAlign: "left",
    flex: 1,
  },
  step: {
    fontWeight: 600,
    fontSize: 15,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    opacity: 0.92,
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  }
};
