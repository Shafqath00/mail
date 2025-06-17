import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: true }));
app.use(express.json());

// ✅ Define transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "newbiemill72@gmail.com", // Your Gmail
    pass: "blrc chxo acne fthv",    // App password
  },
});

// POST /send-lead
app.post("/send-lead", async (req, res) => {
  const { toEmail, ...formData } = req.body;

  if (!toEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(toEmail)) {
    return res.status(400).json({ error: "Invalid destination email" });
  }

  const formattedData = Object.entries(formData)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");

  const mailOptions = {
    from: "newbiemill72@gmail.com",
    to: toEmail,
    subject: "New Lead Submission",
    text: formattedData,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("Email send failed:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
