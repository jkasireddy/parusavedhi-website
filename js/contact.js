
/* ==========================================================
   PARUSAVEDHI — CONTACT FORM
   ========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("enquiry-form");

    if (!form) return;

    const submitButton =
        document.getElementById("submit-button");

    const status =
        document.getElementById("form-status");

    const message =
        document.getElementById("message");

    const messageCount =
        document.getElementById("message-count");

    const category =
        document.getElementById("category");

    const product =
        document.getElementById("product");

    const isLocalDevelopment = [
        "localhost",
        "127.0.0.1"
    ].includes(window.location.hostname);

    const widget =
        form.querySelector(".cf-turnstile");

    const testSiteKey =
        "1x00000000000000000000AA";

    /* ---------- Status Messages ---------- */

    function showStatus(type, text) {

        status.className = `form-status ${type}`;

        status.textContent = text;

        status.hidden = false;

    }

    /* ---------- Character Counter ---------- */

    function updateCharacterCount() {

        messageCount.textContent =
            `${message.value.length} / 3000 characters`;

    }

    message.addEventListener(
        "input",
        updateCharacterCount
    );

    updateCharacterCount();

    /* ---------- URL Parameters ---------- */

    const params = new URLSearchParams(
        window.location.search
    );

    function selectValidOption(element, value) {

        if (!value) return;

        const exists = Array.from(
            element.options
        ).some(option => option.value === value);

        if (exists) {

            element.value = value;

        }
    }

    selectValidOption(
        category,
        params.get("category")
    );

    selectValidOption(
        product,
        params.get("product")
    );

    /* ---------- Production Safeguard ---------- */

    const configuredSiteKey =
        widget.dataset.sitekey;

    const productionKeyMissing =
        !isLocalDevelopment &&
        configuredSiteKey === testSiteKey;

    if (productionKeyMissing) {

        showStatus(
            "info",
            "Online enquiries are not enabled yet. " +
            "Please email info@parusavedhi.com."
        );

        return;

    }

    /* ---------- Local Preview Mode ---------- */

    const localPreview =
        isLocalDevelopment &&
        params.get("preview") === "1";

    if (localPreview) {

        showStatus(
            "info",
            "Local preview mode: submissions will not send email."
        );

    }

    /* ---------- Enable Form ---------- */

    submitButton.disabled = false;

    /* ---------- Form Submission ---------- */

    form.addEventListener("submit", async event => {

        event.preventDefault();

        if (!form.reportValidity()) return;

        const formData = new FormData(form);

        if (
            !localPreview &&
            !formData.get("cf-turnstile-response")
        ) {

            showStatus(
                "error",
                "Please complete the security verification."
            );

            return;

        }

        submitButton.disabled = true;

        submitButton.textContent = "Submitting...";

        status.hidden = true;

        try {

            /* Local UI testing without sending email */

            if (localPreview) {

                const reference =
                    `TEST-${Date.now()}`;

                showStatus(
                    "info",
                    `Preview successful. Reference: ${reference}. ` +
                    "No email has been sent."
                );

                return;

            }

            /* Actual server-side submission */

            const response = await fetch(
                "/api/enquiry",
                {
                    method: "POST",
                    body: formData
                }
            );

            const contentType =
                response.headers.get("content-type") || "";

            if (!contentType.includes("application/json")) {

                throw new Error(
                    "The enquiry service is unavailable."
                );

            }

            const result = await response.json();

            if (!response.ok || !result.success) {

                throw new Error(
                    result.message ||
                    "Unable to submit your enquiry."
                );

            }

            showStatus(
                "success",
                "Thank you for contacting Parusavedhi. " +
                `Your enquiry reference is ${result.reference}.`
            );

            form.reset();

            updateCharacterCount();

        } catch (error) {

            showStatus(
                "error",
                `${error.message} Please try again or ` +
                "email info@parusavedhi.com."
            );

        } finally {

            submitButton.disabled = false;

            submitButton.textContent = "Submit Enquiry →";

            if (window.turnstile) {

                window.turnstile.reset();

            }
        }
    });
});
