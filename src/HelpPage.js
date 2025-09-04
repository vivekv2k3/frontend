import React, { useState } from "react";
import { FaQuestionCircle, FaEnvelopeOpenText, FaPhoneAlt } from "react-icons/fa";

const faqs = [
  { question: "How do I apply for a credit card?", answer: "Go to the Credit Card section, fill out the application form, and upload your documents." },
  { question: "What documents are required?", answer: "Typically PAN Card, Address Proof, Identity Proof, and Payslip." },
  { question: "How do I track my application status?", answer: "Visit your profile and view the Application Status tracker. You’ll get notifications for every step." },
  { question: "How long does approval take?", answer: "Approval can take 2-5 working days after all documents are verified." },
  { question: "Can I update my profile details?", answer: "Yes, use the Edit Profile button in your profile section." }
];

const bankContact = {
  email: "helpdesk.in@sc.com",
  phone: "+91-22-67687000"
};

export default function HelpPage() {
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");
  const [openIndex, setOpenIndex] = useState(null);
  const [file, setFile] = useState(null);

  const toggleFAQ = (i) => setOpenIndex(openIndex === i ? null : i);

  function handleSend(e) {
    e.preventDefault();
    setStatus("✅ Your query has been sent to our customer support!");
    setMsg("");
    setFile(null);
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  return (
    <div className="customer-profile">
    <div style={styles.wrapper}>
      {/* Hero */}
      <div style={styles.hero}>
        <span style={styles.heroIcon}><FaQuestionCircle /></span>
        <span style={styles.heroTitle}>Help & FAQ</span>
        <span style={styles.heroSubtitle}>
          Find answers, reach out, and stay in touch—we’re here for your credit card journey.
        </span>
      </div>

      {/* FAQ Section */}
      <div style={styles.centerWrap}>
        <div style={{ ...styles.sectionCard, maxWidth: 900, width: "100%" }}>
          <div style={styles.sectionHeader}>
            <FaQuestionCircle style={styles.headerIcon} />
            <span>Frequently Asked Questions</span>
          </div>
          {faqs.map((faq, i) => (
            <div key={i} style={styles.faqCard}>
              <div style={styles.faqQuestionRow} onClick={() => toggleFAQ(i)}>
                <span style={{
                  ...styles.arrowIcon,
                  transform: openIndex === i ? "rotate(90deg)" : "rotate(0deg)"
                }}>
                  ▶
                </span>
                <span style={styles.qText}>{faq.question}</span>
              </div>
              {openIndex === i && <div style={styles.aText}>{faq.answer}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Send Query + Customer Support in the same row */}
      <div style={styles.rowWrap}>
        {/* Send Query Card */}
        <div style={{ ...styles.sectionCard, maxWidth: 500, width: "100%" }}>
          <div style={styles.sectionHeader}>
            <FaEnvelopeOpenText style={styles.headerIcon} />
            <span>Send us your Query</span>
          </div>
          <form onSubmit={handleSend} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <textarea
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your question, feedback or request here"
              style={styles.textArea}
              minLength={7}
              required
            />
            <div style={styles.attachRow}>
              <label style={styles.attachBtn}>
                <span role="img" aria-label="attach" style={{ fontSize: 18, marginRight: 5 }}>📎</span>
                Attach file
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </label>
              {file && <span style={styles.fileName}>{file.name}</span>}
            </div>
            <button style={styles.sendBtn} type="submit">Send Message</button>
          </form>
          {status && <div style={styles.statusMsg}>{status}</div>}
        </div>

        {/* Customer Support Card */}
        <div style={{ ...styles.sectionCard, maxWidth: 350, minHeight: 180, width: "100%" }}>
          <div style={styles.sectionHeader}>
            <FaPhoneAlt style={styles.headerIcon} />
            <span>Customer Support</span>
          </div>
          <div style={styles.contactBlock}>
            <div>
              <b>Email: </b>
              <a href={`mailto:${bankContact.email}`} style={styles.contactLink}>{bankContact.email}</a>
            </div>
            <div>
              <b>Phone: </b>
              <a href={`tel:${bankContact.phone}`} style={styles.contactLink}>{bankContact.phone}</a>
            </div>
            <div style={{ marginTop: 8, color: "#378ee6", fontSize: 14 }}>
              24 x 7 Support | <span style={{ color: "var(--success)" }}>Standard Chartered</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

/* Styles */
const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "var(--page-bg)",
    padding: "48px 0 70px 0",
    fontFamily: '"SCProsperSans", var(--font-family)'
  },
  hero: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 26
  },
  heroIcon: { fontSize: 38, color: "#378ee6", marginBottom: 6 },
  heroTitle: { fontWeight: 700, fontSize: 34, color: "#174E7C", letterSpacing: 1.2 },
  heroSubtitle: { fontSize: 17, color: "var(--muted)", marginTop: 6 },
  centerWrap: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 30
  },
  rowWrap: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: 30,
    flexWrap: "wrap",
    marginBottom: 30
  },
  sectionCard: {
    background: "var(--card-bg)",
    borderRadius: 24,
    boxShadow: "0 2px 26px #378ee644",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1.5px solid rgba(40,92,231,0.12)",
    padding: "28px",
    gap: 18,
    display: "flex",
    flexDirection: "column"
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
    fontSize: 19,
    color: "#378ee6",
    gap: 15,
    marginBottom: 14
  },
  headerIcon: { fontSize: 22, color: "#378ee6" },
  faqCard: {
    background: "rgba(247, 242, 242, 0.84)",
    borderRadius: 14,
    boxShadow: "0 2px 10px #378ee633",
    marginBottom: 10
  },
  faqQuestionRow: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "11px 18px"
  },
  arrowIcon: {
    fontSize: 18,
    color: "#378ee6",
    marginRight: 10,
    transition: "transform 0.2s ease"
  },
  qText: {
    fontWeight: 600,
    fontSize: 16,
    color: "#182a3a",
    flex: 1
  },
  aText: {
    fontSize: 15,
    color: "#182a3a",
    padding: "10px 18px",
    borderTop: "1px solid rgba(0,0,0,0.05)",
    background: "rgba(247, 242, 242, 0.84)"
  },
  textArea: {
    width: "95%",
    minHeight: 75,
    borderRadius: 14,
    border: "1.2px solid var(--muted)",
    padding: 13,
    fontSize: 15,
    background: "rgba(21, 19, 19, 0.08)",
    color: "var(--text)",
    boxShadow: "0 1px 7px #378ee622"
  },
  attachRow: {
    display: "flex",
    alignItems: "center",
    gap: 10
  },
  attachBtn: {
    background: "#378ee6",
    color: "#fff",
    borderRadius: 10,
    cursor: "pointer",
    padding: "7px 17px",
    display: "flex",
    alignItems: "center",
    fontWeight: 500,
    fontSize: 15,
    boxShadow: "0 2px 12px #378ee666"
  },
  fileName: {
    color: "#378ee6",
    fontSize: 14,
    fontWeight: 500
  },
  sendBtn: {
    background: "#378ee6",
    color: "#fff",
    borderRadius: 14,
    fontSize: 15,
    padding: "8px 28px",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 2px 8px #378ee666"
  },
  statusMsg: { marginTop: 12, color: "#2bb872", fontWeight: 500 },
  contactBlock: {
    borderTop: "1.2px solid var(--muted)",
    paddingTop: 14,
    marginTop: 6,
    color: "#a9acafff",
    fontSize: 15,
    display: "flex",
    flexDirection: "column",
    gap: 8
  },
  contactLink: { color: "#fdfeffff", fontWeight: 500, textDecoration: "none" }
};
