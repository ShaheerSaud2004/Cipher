// Hide Loading Screen After Page Load
window.addEventListener("load", function () {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.opacity = "0";
    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 500);
});

// Smooth Scroll for Navigation Links
document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target.scrollIntoView({ behavior: "smooth" });
    });
});

// Send Email with EmailJS REST API
function sendEmail(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const formStatus = document.getElementById("form-status");

    // Clear previous status
    formStatus.textContent = "";
    formStatus.style.color = "";

    // Validate form fields
    if (!name || !email || !message) {
        formStatus.textContent = "All fields are required.";
        formStatus.style.color = "red";
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formStatus.textContent = "Please enter a valid email address.";
        formStatus.style.color = "red";
        return;
    }

    // Show sending status
    formStatus.textContent = "Sending message...";
    formStatus.style.color = "blue";

    // EmailJS REST API parameters
    const emailParams = {
        service_id: "service_vw4zcz4", // Your EmailJS Service ID
        template_id: "template_kh1uqeb", // Your EmailJS Template ID
        user_id: "69lsN_TkiIecjWyy-", // Your Public Key
        template_params: {
            name: name,
            email: email,
            message: message,
        },
    };

    // Send email using fetch
    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(emailParams),
    })
        .then((response) => {
            if (response.ok) {
                formStatus.textContent =
                    "Message sent successfully. We'll be in touch soon!";
                formStatus.style.color = "green";
                console.log("Email sent successfully.");
                document.getElementById("contact-form").reset(); // Clear the form
            } else {
                throw new Error(`Failed to send email: ${response.status}`);
            }
        })
        .catch((error) => {
            console.error("Error sending email:", error);
            formStatus.textContent =
                "Failed to send the message. Please try again.";
            formStatus.style.color = "red";
        });
}

// Attach the sendEmail function to the form submission event
document.getElementById("contact-form").addEventListener("submit", sendEmail);
