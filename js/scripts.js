const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const contactForm = document.querySelector("#contactForm");
const formNote = document.querySelector("#formNote");
const lightbox = document.querySelector("#imageLightbox");
const lightboxImage = lightbox?.querySelector(".lightbox-image");
const lightboxClose = lightbox?.querySelector(".lightbox-close");

if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", `${isOpen}`);
    });

    siteNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            siteNav.classList.remove("is-open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

const updateHeaderState = () => {
    if (!siteHeader) return;
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 16);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

if (contactForm && formNote) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        formNote.textContent = "Thanks. This static demo captured the interaction successfully and is ready for backend integration.";
        formNote.classList.add("is-success");
        contactForm.reset();
    });
}

if (lightbox && lightboxImage) {
    const openLightbox = (image) => {
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt || "Expanded project image";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        lightboxImage.src = "";
        lightboxImage.alt = "";
        document.body.style.overflow = "";
    };

    document.querySelectorAll(".zoomable-media img").forEach((image) => {
        image.addEventListener("click", () => openLightbox(image));
    });

    lightboxClose?.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {
        if (event.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
            closeLightbox();
        }
    });
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && window.gsap) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-copy > *", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
    });

    gsap.from(".hero-visual", {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.15,
    });

    gsap.to(".ambient-one", {
        y: 70,
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
        },
    });

    gsap.to(".ambient-two", {
        y: -90,
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
        },
    });

    document.querySelectorAll("[data-reveal]").forEach((element) => {
        if (element.closest(".hero")) return;

        const animationType = element.dataset.reveal;
        const delay = Number(element.dataset.delay || 0);
        const fromVars = { opacity: 0, duration: 0.9, delay, ease: "power3.out" };

        if (animationType === "left") fromVars.x = 60;
        else if (animationType === "right") fromVars.x = -60;
        else fromVars.y = 40;

        gsap.fromTo(
            element,
            fromVars,
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 0.9,
                delay,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 82%",
                    once: true,
                },
            }
        );
    });

    document.querySelectorAll("[data-float]").forEach((element, index) => {
        gsap.to(element, {
            y: index % 2 === 0 ? 18 : -18,
            x: index % 2 === 0 ? -10 : 10,
            duration: 3.2 + index,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    });

    const marqueeTrack = document.querySelector(".marquee-track");
    if (marqueeTrack) {
        gsap.to(marqueeTrack, {
            xPercent: -35,
            duration: 20,
            ease: "none",
            repeat: -1,
        });
    }

    document.querySelectorAll(".magnetic").forEach((element) => {
        const xTo = gsap.quickTo(element, "x", { duration: 0.35, ease: "power3.out" });
        const yTo = gsap.quickTo(element, "y", { duration: 0.35, ease: "power3.out" });

        element.addEventListener("mousemove", (event) => {
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            xTo(x * 0.08);
            yTo(y * 0.08);
        });

        element.addEventListener("mouseleave", () => {
            xTo(0);
            yTo(0);
        });
    });

    document.querySelectorAll(".gallery-card, .spotlight-media, .tilt-card").forEach((element) => {
        const image = element.querySelector("img") || element;
        const xTo = gsap.quickTo(image, "x", { duration: 0.45, ease: "power3.out" });
        const yTo = gsap.quickTo(image, "y", { duration: 0.45, ease: "power3.out" });
        const scaleTo = gsap.quickTo(image, "scale", { duration: 0.45, ease: "power3.out" });

        element.addEventListener("mousemove", (event) => {
            const rect = element.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;
            xTo(x * 16);
            yTo(y * 16);
            scaleTo(1.06);
        });

        element.addEventListener("mouseleave", () => {
            xTo(0);
            yTo(0);
            scaleTo(1);
        });
    });
}
