const Contact = require("../models/Contact");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

exports.contact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Save to MongoDB
        const newContact = new Contact({
            name,
            email,
            message,
        });

        await newContact.save();

        // Send email
        await resend.emails.send({
            from: "onboarding@resend.dev", // Replace with your verified sender
            to: "YOUR_EMAIL@example.com",   // Replace with your email
            subject: "New Portfolio Contact",
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong> ${message}</p>
            `,
        });

        res.status(200).json({
            success: true,
            message: "Message received successfully!",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Something went wrong.",
        });
    }
};