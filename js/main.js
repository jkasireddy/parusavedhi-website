
/* ==========================================================
   PARUSAVEDHI FOOD INDUSTRIES
   Shared Website Components and Interactivity
   ========================================================== */

"use strict";

const COMPANY = {
    name: "Parusavedhi Food Industries Private Limited",
    brand: "Parusavedhi Food Industries",
    tagline: "Purposeful Innovation. Healthier Generations.",
    established: 2021,
    website: "https://www.parusavedhi.com",
    email: "info@parusavedhi.com",
    sales: "sales@parusavedhi.com",
    support: "support@parusavedhi.com",
    partnerships: "partnerships@parusavedhi.com",
    cin: "U15132TG2021PTC155036",
    gstin: "36AAMCP3020C1ZU"
};

/* ---------- Shared Header ---------- */

function renderHeader() {
    const header = document.getElementById("site-header");

    if (!header) return;

    header.innerHTML = `
        <a href="#main-content" class="skip-link">
            Skip to main content
        </a>

        <div class="top-bar">
            <div class="container top-bar-inner">
                <span>
                    Indian Innovation. Global Ambition.
                </span>

                <div class="top-bar-contact">
                    <span>Established ${COMPANY.established}</span>

                    <a href="mailto:${COMPANY.email}">
                        ${COMPANY.email}
                    </a>
                </div>
            </div>
        </div>

        <div class="container header-inner">

            <a href="index.html" class="brand-logo"
               aria-label="Parusavedhi homepage">
                <img
                    src="assets/logo/logo-horizontal.png"
                    alt="Parusavedhi Food Industries"
                    width="240">
            </a>

            <nav aria-label="Main navigation">

                <button class="mobile-toggle"
                        id="mobile-toggle"
                        aria-label="Toggle navigation"
                        aria-controls="nav-menu"
                        aria-expanded="false">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <ul class="nav-menu" id="nav-menu">

                    <li>
                        <a href="index.html">Home</a>
                    </li>

                    <li>
                        <button class="dropdown-toggle"
                                aria-expanded="false"
                                aria-controls="about-dropdown">
                            About Us ▾
                        </button>

                        <ul class="dropdown-menu"
                            id="about-dropdown" hidden>
                            <li>
                                <a href="about.html">Our Story</a>
                            </li>
                            <li>
                                <a href="founder.html">Our Founder</a>
                            </li>
                            <li>
                                <a href="leadership.html">
                                    Leadership
                                </a>
                            </li>
                            <li>
                                <a href="mission-vision-values.html">
                                    Mission, Vision & Values
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <button class="dropdown-toggle"
                                aria-expanded="false"
                                aria-controls="products-dropdown">
                            Products ▾
                        </button>

                        <ul class="dropdown-menu"
                            id="products-dropdown" hidden>
                            <li>
                                <a href="products.html">
                                    All Products
                                </a>
                            </li>
                            <li>
                                <a href="corn-roaster.html">
                                    Electric Corn Roaster
                                </a>
                            </li>
                            <li>
                                <a href="corn-boiler.html">
                                    Sweet Corn Boiler
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="services.html">Services</a>
                    </li>

                    <li>
                        <a href="social-impact.html">Our Impact</a>
                    </li>

                    <li>
                        <a href="partnerships.html">Partnerships</a>
                    </li>

                    <li>
                        <a href="contact.html">Contact</a>
                    </li>

                </ul>
            </nav>
        </div>
    `;
}

/* ---------- Shared Footer ---------- */

function renderFooter() {
    const footer = document.getElementById("site-footer");

    if (!footer) return;

    footer.innerHTML = `
        <div class="container">

            <div class="footer-grid">

                <div class="footer-brand">

                    <a href="index.html">
                        <img
                            src="assets/logo/logo-horizontal.png"
                            alt="Parusavedhi Food Industries"
                            loading="lazy">
                    </a>

                    <p>
                        An Indian food technology and manufacturing
                        enterprise committed to purposeful innovation,
                        better everyday food choices and lasting value.
                    </p>

                    <p class="footer-tagline">
                        ${COMPANY.tagline}
                    </p>
                </div>

                <div>
                    <h3 class="footer-heading">Our Company</h3>

                    <ul class="footer-links">
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="founder.html">Our Founder</a></li>
                        <li><a href="leadership.html">Leadership</a></li>
                        <li>
                            <a href="mission-vision-values.html">
                                Mission & Vision
                            </a>
                        </li>
                        <li>
                            <a href="social-impact.html">Our Impact</a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 class="footer-heading">Solutions</h3>

                    <ul class="footer-links">
                        <li>
                            <a href="corn-roaster.html">
                                Electric Corn Roaster
                            </a>
                        </li>
                        <li>
                            <a href="corn-boiler.html">
                                Sweet Corn Boiler
                            </a>
                        </li>
                        <li>
                            <a href="services.html">Our Services</a>
                        </li>
                        <li>
                            <a href="partnerships.html">
                                Business Opportunities
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="footer-contact">
                    <h3 class="footer-heading">Connect With Us</h3>

                    <ul class="footer-links">
                        <li>Hyderabad, Telangana, India</li>

                        <li>
                            <a href="mailto:${COMPANY.email}">
                                ${COMPANY.email}
                            </a>
                        </li>

                        <li>
                            <a href="mailto:${COMPANY.sales}">
                                ${COMPANY.sales}
                            </a>
                        </li>

                        <li>
                            <a href="mailto:${COMPANY.support}">
                                ${COMPANY.support}
                            </a>
                        </li>

                        <li>
                            <a href="contact.html">
                                Contact Our Team
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="footer-bottom">

                <div class="footer-bottom-inner">
                    <span>
                        &copy; ${new Date().getFullYear()}
                        ${COMPANY.name}.
                        All rights reserved.
                    </span>

                    <a href="privacy.html">Privacy Policy</a>
                </div>

                <p class="footer-legal">
                    CIN: ${COMPANY.cin}
                    &nbsp; | &nbsp;
                    GSTIN: ${COMPANY.gstin}
                </p>
            </div>
        </div>

        <button id="back-to-top"
                class="back-to-top"
                aria-label="Back to top"
                hidden>
            ↑
        </button>
    `;
}

/* ---------- Mobile Navigation ---------- */

function initializeNavigation() {
    const toggle = document.getElementById("mobile-toggle");
    const menu = document.getElementById("nav-menu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 960) {
            menu.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });
}

/* ---------- Dropdown Menus ---------- */

function initializeDropdowns() {
    const toggles = document.querySelectorAll(".dropdown-toggle");

    function closeDropdowns(except = null) {
        toggles.forEach(toggle => {
            if (toggle === except) return;

            const menu = document.getElementById(
                toggle.getAttribute("aria-controls")
            );

            toggle.setAttribute("aria-expanded", "false");

            if (menu) menu.hidden = true;
        });
    }

    toggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            const menu = document.getElementById(
                toggle.getAttribute("aria-controls")
            );

            if (!menu) return;

            const isOpen =
                toggle.getAttribute("aria-expanded") === "true";

            closeDropdowns(toggle);

            toggle.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );

            menu.hidden = isOpen;
        });
    });

    document.addEventListener("click", event => {
        if (!event.target.closest(".nav-menu")) {
            closeDropdowns();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            const openToggle = Array.from(toggles).find(
                toggle =>
                    toggle.getAttribute("aria-expanded") === "true"
            );

            closeDropdowns();

            if (openToggle) openToggle.focus();
        }
    });
}

/* ---------- Active Page Highlight ---------- */


/* ---------- Active Page Highlight ---------- */

function highlightActivePage() {

    const currentPage = (
        window.location.pathname.split("/").pop()
        || "index.html"
    ).replace(/\.html$/, "");

    document.querySelectorAll(".nav-menu a")
        .forEach(link => {

            const linkPage = (
                link.getAttribute("href") || ""
            ).replace(/\.html$/, "");

            if (linkPage !== currentPage) return;

            link.classList.add("active");

            link.setAttribute("aria-current", "page");

            // Highlight the parent dropdown button.

            const dropdown = link.closest(".dropdown-menu");

            if (dropdown) {

                const parentToggle =
                    dropdown.parentElement.querySelector(
                        ".dropdown-toggle"
                    );

                if (parentToggle) {

                    parentToggle.classList.add("active");

                }
            }
        });
}


/* ---------- Scroll Effects ---------- */

function initializeScrollEffects() {
    const header = document.getElementById("site-header");
    const backToTop = document.getElementById("back-to-top");

    function updateScrollState() {
        if (header) {
            header.classList.toggle(
                "scrolled",
                window.scrollY > 50
            );
        }

        if (backToTop) {
            backToTop.hidden = window.scrollY < 400;
        }
    }

    window.addEventListener(
        "scroll",
        updateScrollState,
        { passive: true }
    );

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? "auto" : "smooth"
            });
        });
    }

    updateScrollState();
}





/* ---------- Product Image Fallback ---------- */

function initializeProductImages() {

    document.querySelectorAll("[data-product-image]")
        .forEach(img => {

            function showFallback() {

                const wrapper = img.closest(
                    "[data-image-wrapper]"
                );

                if (!wrapper) return;

                const fallback = wrapper.querySelector(
                    ".product-placeholder"
                );

                img.hidden = true;

                if (fallback) {
                    fallback.hidden = false;
                }
            }

            img.addEventListener("error", showFallback);

            img.addEventListener("load", () => {

                const wrapper = img.closest(
                    "[data-image-wrapper]"
                );

                const fallback = wrapper?.querySelector(
                    ".product-placeholder"
                );

                img.hidden = false;

                if (fallback) {
                    fallback.hidden = true;
                }
            });

            // Handle images that failed before initialization.

            if (img.complete && img.naturalWidth === 0) {
                showFallback();
            }
        });
}

/* ---------- Product Image Gallery ---------- */

function initializeProductGallery() {

    document.querySelectorAll(".product-gallery")
        .forEach(gallery => {

            const mainImage = gallery.querySelector(
                ".gallery-main [data-product-image]"
            );

            const thumbnails = gallery.querySelectorAll(
                ".gallery-thumbnail"
            );

            if (!mainImage || !thumbnails.length) return;

            thumbnails.forEach(thumbnail => {

                thumbnail.addEventListener("click", () => {

                    const imageSource =
                        thumbnail.dataset.image;

                    if (!imageSource) return;

                    mainImage.src = imageSource;

                    mainImage.alt =
                        thumbnail.dataset.alt ||
                        "Parusavedhi product photograph";

                    thumbnails.forEach(item => {
                        item.classList.remove("is-active");
                        item.setAttribute(
                            "aria-pressed", "false"
                        );
                    });

                    thumbnail.classList.add("is-active");

                    thumbnail.setAttribute(
                        "aria-pressed", "true"
                    );
                });
            });
        });
}

/* ---------- Application Initialization ---------- */



document.addEventListener("DOMContentLoaded", () => {

    renderHeader();
    renderFooter();

    initializeNavigation();
    initializeDropdowns();
    highlightActivePage();
    initializeScrollEffects();

    // Product catalogue and gallery

    initializeProductImages();
    initializeProductGallery();
});