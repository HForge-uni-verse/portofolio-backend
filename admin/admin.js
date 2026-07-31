const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "login.html";
}
const API_URL = "https://portofolio-backend-3xuh.onrender.com/api/contact";

async function loadContacts() {
    try {
        const response = await fetch(API_URL, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});
        const contacts = await response.json();

        // Total Contacts
        document.getElementById("totalContacts").textContent = contacts.length;

        // Today's Contacts
        const today = new Date().toDateString();
        const todayContacts = contacts.filter(contact =>
            new Date(contact.createdAt || contact.date).toDateString() === today
        );

        document.getElementById("todayContacts").textContent = todayContacts.length;

        // Table
        const table = document.getElementById("messagesTable");
        table.innerHTML = "";

        contacts.forEach(contact => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${new Date(contact.date).toLocaleDateString()}</td>
        <td><button>View</button></td>
    `;

    row.querySelector("button").addEventListener("click", () => {
        alert(contact.message);
    });

    table.appendChild(row);
});

    } catch (error) {
        console.error("Error:", error);
    }
}

function viewMessage(message) {
    alert(message);
}

loadContacts();
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("adminLoggedIn");
localStorage.removeItem("token");
        window.location.href = "login.html";
    });
}