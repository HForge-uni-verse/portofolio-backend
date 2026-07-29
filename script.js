// ===============================
// Reveal sections on scroll
// ===============================
const hiddenElements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2,
});

hiddenElements.forEach((el) => observer.observe(el));


// ===============================
// Active Navbar Link
// ===============================
const navLinks = document.querySelectorAll("header nav a");
const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const navLink = document.querySelector(`header nav a[href="#${id}"]`);

        if (entry.isIntersecting) {
            navLinks.forEach((link) => link.classList.remove("active"));
            if (navLink) navLink.classList.add("active");
        }
    });
}, {
    threshold: 0.5,
});

sections.forEach((section) => sectionObserver.observe(section));


// ===============================
// Contact Form
// ===============================
const contactForm = document.querySelector("#contactForm");
const feedbackMessage = document.querySelector(".feedback-message");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const formData = new FormData(contactForm);

        const name = formData.get("name");
        const email = formData.get("email");
        const message = formData.get("message");

        if (!name || !email || !message) {
            feedbackMessage.textContent = "Please complete all fields.";
            feedbackMessage.classList.add("visible");
            return;
        }

        try {

            const response = await fetch("https://portofolio-backend-3xuh.onrender.com/api/contact", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    message
                })

            });

            const data = await response.json();

            feedbackMessage.textContent = data.message;
            feedbackMessage.classList.add("visible");

            contactForm.reset();

            setTimeout(() => {
                feedbackMessage.classList.remove("visible");
            }, 5000);

        } catch (error) {

            feedbackMessage.textContent = "Failed to send message.";
            feedbackMessage.classList.add("visible");

        }

    });

}


// ===============================
// Mouse Glow
// ===============================
const glow = document.querySelector(".cursor-glow");

if (glow) {

    document.addEventListener("mousemove", (e) => {

        glow.style.left = e.clientX + "px";
        glow.style.top = e.clientY + "px";

    });

}