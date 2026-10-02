"use strict";

/* =========================================================
   TUNDAR TECHNOLOGIES
   ABOUT PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const nav = document.getElementById("aboutNav");

    const revealElements =
        document.querySelectorAll(".reveal");

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    const backgrounds =
        document.querySelectorAll(
            ".hero-background, .vision-background, .final-background"
        );


    /* =====================================================
       NAVIGATION SCROLL STATE
    ===================================================== */

    const updateNav = () => {

        if (!nav) {
            return;
        }

        if (window.scrollY > 30) {
            nav.classList.add("nav-scrolled");
        } else {
            nav.classList.remove("nav-scrolled");
        }

    };


    updateNav();

    window.addEventListener(
        "scroll",
        updateNav,
        { passive: true }
    );


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#" ||
                !targetId.startsWith("#")
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const navHeight =
                nav ? nav.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navHeight -
                18;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       REVEAL ON SCROLL
    ===================================================== */

    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach((element) => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach((element) => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       PARALLAX
    ===================================================== */

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !reducedMotion &&
        backgrounds.length
    ) {

        let ticking = false;


        const updateParallax = () => {

            const scrollY =
                window.scrollY;

            backgrounds.forEach((background) => {

                const parent =
                    background.parentElement;

                if (!parent) {
                    return;
                }

                const rect =
                    parent.getBoundingClientRect();

                const offset =
                    (rect.top + rect.height / 2 -
                    window.innerHeight / 2) * -0.035;

                background.style.transform =
                    `scale(1.04) translate3d(0, ${offset}px, 0)`;

            });

            ticking = false;

        };


        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(
                        updateParallax
                    );

                    ticking = true;

                }

            },
            { passive: true }
        );


        updateParallax();

    }


    /* =====================================================
       MAKE INITIAL HERO CONTENT VISIBLE
    ===================================================== */

    const heroReveals =
        document.querySelectorAll(
            ".hero .reveal"
        );

    heroReveals.forEach((element) => {

        window.setTimeout(() => {

            element.classList.add("visible");

        }, 120);

    });


});
/* =========================================================
   OPTIONAL INTERACTION ENHANCEMENTS
========================================================= */


/* =========================================================
   CARD POINTER EFFECT
========================================================= */

const interactiveCards =
    document.querySelectorAll(
        ".mission-card, .technology-card, .value-card"
    );


interactiveCards.forEach((card) => {

    card.addEventListener(
        "pointermove",
        (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const rotateX =
                ((y / rect.height) - 0.5) * -2;

            const rotateY =
                ((x / rect.width) - 0.5) * 2;

            card.style.transform =
                `translateY(-7px) perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        }
    );


    card.addEventListener(
        "pointerleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =========================================================
   PAGE LOAD STATE
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);