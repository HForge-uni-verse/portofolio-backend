const express = require("express");
const router = express.Router();

const {
    contact,
    getContacts,
    deleteContact,
} = require("../controllers/contactController");

// Create Contact
router.post("/", contact);

// Get All Contacts
router.get("/", getContacts);

// Delete Contact
router.delete("/:id", deleteContact);

module.exports = router;