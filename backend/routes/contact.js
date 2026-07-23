const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");
const transporter = require("../config/email");

router.post("/", async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();
        await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "📩 New Portfolio Contact",
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}

Message:
${message}
`
});

        res.status(201).json({
            success: true,
            message: "Message saved successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;