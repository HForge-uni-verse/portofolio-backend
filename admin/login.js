const loginBtn = document.getElementById("loginBtn");
const error = document.getElementById("error");

loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch("https://portofolio-backend-3xuh.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("adminLoggedIn", "true");
            window.location.href = "index.html";
        } else {
            error.textContent = data.message;
        }

    } catch (err) {
        console.error(err);
        error.textContent = "Server error. Please try again.";
    }
});