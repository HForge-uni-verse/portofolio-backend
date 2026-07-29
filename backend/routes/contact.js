const express = require("express");
const router = express.Router();
const { Resend } = require("resend");

const Contact = require("../models/contact");

const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "sarruhassan@gmail.com", // Replace with your Gmail
      subject: "📩 New Portfolio Contact",
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("CONTACT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
