// ============================
// TUNDAR V3
// ============================

console.log("Tundar Technologies Loaded");


// ============================
// LOADING SCREEN
// ============================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("loader-hidden");

        setTimeout(() => {
            loader.remove();
        }, 600);

    }, 300);

});


// ============================
// NAVBAR SCROLL EFFECT
// ============================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 60) {

        navbar.style.background = "rgba(5,8,22,.92)";
        navbar.style.boxShadow =
            "0 10px 40px rgba(0,0,0,.35)";

    } else {

        navbar.style.background =
            "rgba(8,12,30,.55)";

        navbar.style.boxShadow = "none";

    }

});


// ============================
// SCROLL REVEAL
// ============================

const revealElements =
    document.querySelectorAll(".fade");

if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver((entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        }, {
            threshold: 0.15
        });

    revealElements.forEach((element) => {

        element.classList.add("hidden");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("show");

    });

}


// ============================
// HERO FADE
// ============================

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (!hero) return;

    const opacity =
        1 - window.scrollY / 900;

    hero.style.opacity =
        Math.max(opacity, 0);

});


// ============================
// MOUSE GLOW
// ============================

const glow = document.createElement("div");

glow.className = "mouse-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove", (event) => {

    glow.style.left =
        event.clientX + "px";

    glow.style.top =
        event.clientY + "px";

});


// ============================
// COUNTERS
// ============================

const counters =
    document.querySelectorAll(".counter");

counters.forEach((counter) => {

    const number =
        counter.querySelector(".number");

    const target =
        Number(counter.dataset.target);

    if (isNaN(target)) return;

    let current = 0;

    const updateCounter = () => {

        const increment = target / 100;

        if (current < target) {

            current += increment;

            const value =
                Math.ceil(current);

            if (number) {

                number.innerText =
                    value.toLocaleString();

            } else {

                counter.innerText =
                    value.toLocaleString();

            }

            setTimeout(updateCounter, 20);

        } else {

            const finalValue =
                target.toLocaleString();

            if (number) {

                number.innerText =
                    finalValue;

            } else {

                counter.innerText =
                    finalValue;

            }

        }

    };

    updateCounter();

});


// ============================
// MOBILE NAVIGATION
// ============================

const menuToggle =
    document.getElementById("menu-toggle");

const navMenu =
    document.getElementById("nav-menu");


if (menuToggle && navMenu) {

    // Initial state

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.setAttribute(
        "aria-label",
        "Open menu"
    );


    // ============================
    // OPEN / CLOSE MENU
    // ============================

    menuToggle.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            const isOpen =
                navMenu.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close menu"
                    : "Open menu"
            );

        }
    );


    // ============================
    // CLOSE AFTER CLICKING LINK
    // ============================

    navMenu
        .querySelectorAll(".nav-links a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    navMenu.classList.remove(
                        "active"
                    );

                    menuToggle.classList.remove(
                        "active"
                    );

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open menu"
                    );

                }
            );

        });


    // ============================
    // CLOSE WHEN CLICKING OUTSIDE
    // ============================

    document.addEventListener(
        "click",
        (event) => {

            if (
                navMenu.classList.contains("active") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navMenu.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        }
    );


    // ============================
    // CLOSE WITH ESCAPE
    // ============================

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                navMenu.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open menu"
                );

            }

        }
    );

}
// ============================
// TUNDAR CONTACT FORM
// ============================

const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");

if (contactForm && contactStatus) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        const originalText = submitButton.textContent;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        contactStatus.textContent = "";
        contactStatus.className = "contact-status";

        try {

            const formData = new FormData(contactForm);

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {

                contactStatus.textContent =
                    "Message sent successfully.";

                contactStatus.classList.add("success");

                contactForm.reset();

            } else {

                const data = await response.json().catch(() => null);

                if (data && data.errors) {
                    contactStatus.textContent =
                        "Please check your information and try again.";
                } else {
                    contactStatus.textContent =
                        "Something went wrong. Please try again.";
                }

                contactStatus.classList.add("error");
            }

        } catch (error) {

            console.error("Contact form error:", error);

            contactStatus.textContent =
                "Unable to send your message. Please check your connection and try again.";

            contactStatus.classList.add("error");

        } finally {

            submitButton.disabled = false;
            submitButton.textContent = originalText;

        }

    });

}

// ============================
// DYNAMIC FOOTER YEAR
// ============================

document.querySelectorAll("#footer-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
});

