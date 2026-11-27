
/* ==========================================================
   PARUSAVEDHI — ENQUIRY API
   POST /api/enquiry
   Cloudflare Pages Function
   ========================================================== */

const CATEGORIES = {

    general: "General Enquiry",
    sales: "Product Sales & Quotation",
    support: "Technical Support",
    dealership: "Dealership Opportunity",
    distribution: "Distribution Partnership",
    business: "Entrepreneurial Opportunity",
    institutional: "Institutional Enquiry",
    community: "Community / Self-Help Group",
    exports: "International Business",
    other: "Other"

};

const PRODUCTS = {

    "": "Not specified",
    "corn-roaster": "Electric Corn Roasting Machine",
    "corn-boiler": "Sweet Corn Boiling Machine",
    both: "Both Products",
    other: "Other / Not Applicable"

};

/* ---------- Response Helper ---------- */

function jsonResponse(data, status = 200) {

    return new Response(
        JSON.stringify(data),
        {
            status,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "Cache-Control": "no-store",
                "X-Content-Type-Options": "nosniff",
                "X-Frame-Options": "DENY"
            }
        }
    );

}

/* ---------- Safe Field Extraction ---------- */

function getField(form, name) {

    const value = form.get(name);

    return typeof value === "string"
        ? value.trim()
        : "";

}

/* ---------- Reference Generation ---------- */

function generateReference() {

    const date = new Date()
        .toISOString()
        .slice(0, 10)
        .replaceAll("-", "");

    const id = crypto.randomUUID()
        .slice(0, 8)
        .toUpperCase();

    return `PFI-${date}-${id}`;

}

/* ---------- Department Assignment ---------- */

function getDepartment(category) {

    const departments = {

        general: "General",
        sales: "Sales",
        support: "Technical Support",
        dealership: "Partnerships",
        distribution: "Partnerships",
        business: "Partnerships",
        institutional: "Sales",
        community: "Partnerships",
        exports: "Exports",
        other: "General"

    };

    return departments[category];

}

/* ---------- API Entry Point ---------- */

export async function onRequest(context) {

    const { request, env } = context;

    if (request.method !== "POST") {

        return jsonResponse(
            {
                success: false,
                message: "Method not allowed."
            },
            405
        );

    }

    /* ---------- Configuration Validation ---------- */

    const requiredConfig = [
        env.TURNSTILE_SECRET_KEY,
        env.CF_ACCOUNT_ID,
        env.CF_EMAIL_API_TOKEN,
        env.ENQUIRY_RECIPIENT,
        env.ENQUIRY_SENDER
    ];

    if (requiredConfig.some(value => !value)) {

        return jsonResponse(
            {
                success: false,
                message: "The enquiry service is not configured."
            },
            503
        );

    }

    /* Prevent public use of Cloudflare test secrets */

    if (
        /^[123]x0+AA$/.test(env.TURNSTILE_SECRET_KEY)
    ) {

        return jsonResponse(
            {
                success: false,
                message: "The enquiry service is unavailable."
            },
            503
        );

    }

    /* ---------- Same-Origin Validation ---------- */

    const requestOrigin =
        request.headers.get("Origin");

    const currentOrigin =
        new URL(request.url).origin;

    if (requestOrigin !== currentOrigin) {

        return jsonResponse(
            {
                success: false,
                message: "Invalid request origin."
            },
            403
        );

    }

    /* ---------- Request Size Validation ---------- */

    const maxBodyBytes = 32768;

    const declaredLength = Number(
        request.headers.get("Content-Length") || 0
    );

    if (declaredLength > maxBodyBytes) {

        return jsonResponse(
            {
                success: false,
                message: "Request is too large."
            },
            413
        );

    }

    const contentType =
        request.headers.get("Content-Type") || "";

    if (
        !contentType.includes("multipart/form-data") &&
        !contentType.includes(
            "application/x-www-form-urlencoded"
        )
    ) {

        return jsonResponse(
            {
                success: false,
                message: "Unsupported request format."
            },
            415
        );

    }

    try {

        /* ---------- Read Request With Size Limit ---------- */

        const reader = request.body?.getReader();

        if (!reader) {

            return jsonResponse(
                {
                    success: false,
                    message: "Empty request."
                },
                400
            );

        }

        let totalBytes = 0;

        const chunks = [];

        while (true) {

            const { done, value } =
                await reader.read();

            if (done) break;

            totalBytes += value.byteLength;

            if (totalBytes > maxBodyBytes) {

                await reader.cancel();

                return jsonResponse(
                    {
                        success: false,
                        message: "Request is too large."
                    },
                    413
                );

            }

            chunks.push(value);

        }

        const bufferedBody =
            new Uint8Array(totalBytes);

        let offset = 0;

        for (const chunk of chunks) {

            bufferedBody.set(chunk, offset);

            offset += chunk.byteLength;

        }

        const form = await new Response(
            bufferedBody,
            {
                headers: {
                    "Content-Type": contentType
                }
            }
        ).formData();

        /* ---------- Extract Fields ---------- */

        const data = {

            name: getField(form, "name"),
            email: getField(form, "email"),
            phone: getField(form, "phone"),
            organization: getField(form, "organization"),
            location: getField(form, "location"),
            country: getField(form, "country"),
            category: getField(form, "category"),
            product: getField(form, "product"),
            message: getField(form, "message"),
            consent: getField(form, "consent"),
            website: getField(form, "website"),
            token: getField(form, "cf-turnstile-response")

        };

        /* ---------- Honeypot ---------- */

        if (data.website) {

            return jsonResponse(
                {
                    success: false,
                    message: "Unable to process this request."
                },
                400
            );

        }

        /* ---------- Required Fields ---------- */

        if (
            !data.name ||
            !data.email ||
            !data.category ||
            data.message.length < 10 ||
            data.consent !== "yes"
        ) {

            return jsonResponse(
                {
                    success: false,
                    message:
                        "Please complete all required fields."
                },
                400
            );

        }

        /* ---------- Length Validation ---------- */

        const limits = {

            name: 100,
            email: 254,
            phone: 30,
            organization: 150,
            location: 150,
            country: 100,
            message: 3000,
            token: 2048

        };

        for (const [field, limit] of Object.entries(limits)) {

            if (data[field].length > limit) {

                return jsonResponse(
                    {
                        success: false,
                        message: "A field exceeds its maximum length."
                    },
                    400
                );

            }
        }

        /* ---------- Email Validation ---------- */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(data.email)) {

            return jsonResponse(
                {
                    success: false,
                    message: "Please enter a valid email address."
                },
                400
            );

        }

        /* ---------- Allowlist Validation ---------- */

        if (
            !Object.hasOwn(CATEGORIES, data.category) ||
            !Object.hasOwn(PRODUCTS, data.product)
        ) {

            return jsonResponse(
                {
                    success: false,
                    message: "Invalid enquiry selection."
                },
                400
            );

        }

        /* ---------- Turnstile Validation ---------- */

        if (!data.token) {

            return jsonResponse(
                {
                    success: false,
                    message: "Security verification is required."
                },
                400
            );

        }

        const verificationForm = new FormData();

        verificationForm.append(
            "secret",
            env.TURNSTILE_SECRET_KEY
        );

        verificationForm.append(
            "response",
            data.token
        );

        const clientIP =
            request.headers.get("CF-Connecting-IP");

        if (clientIP) {

            verificationForm.append(
                "remoteip",
                clientIP
            );

        }

        const verificationResponse = await fetch(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            {
                method: "POST",
                body: verificationForm,
                signal: AbortSignal.timeout(10000)
            }
        );

        const verification =
            await verificationResponse.json();

        const expectedHostname =
            new URL(request.url).hostname;

        if (
            !verificationResponse.ok ||
            !verification.success ||
            verification.hostname !== expectedHostname ||
            verification.action !== "enquiry"
        ) {

            return jsonResponse(
                {
                    success: false,
                    message:
                        "Security verification failed. Please try again."
                },
                403
            );

        }

        /* ---------- Generate Enquiry Metadata ---------- */

        const reference = generateReference();

        const department =
            getDepartment(data.category);

        const timestamp =
            new Date().toISOString();

        /* ---------- Build Email ---------- */

        const subject =
            `[${department}] ${reference} - ${CATEGORIES[data.category]}`;

        const emailBody = [

            "PARUSAVEDHI FOOD INDUSTRIES PRIVATE LIMITED",
            "New Website Enquiry",
            "",
            `Reference: ${reference}`,
            `Received (UTC): ${timestamp}`,
            `Department: ${department}`,
            "",
            `Name: ${data.name}`,
            `Email: ${data.email}`,
            `Phone: ${data.phone || "Not provided"}`,
            `Organization: ${data.organization || "Not provided"}`,
            `Location: ${data.location || "Not provided"}`,
            `Country: ${data.country || "Not provided"}`,
            `Category: ${CATEGORIES[data.category]}`,
            `Product: ${PRODUCTS[data.product]}`,
            "",
            "CUSTOMER MESSAGE",
            "----------------",
            data.message,
            "",
            "Privacy consent: Provided",
            "",
            "Source: Parusavedhi corporate website"

        ].join("\n");

        /* ---------- Send Email via Cloudflare ---------- */

        const emailResponse = await fetch(

            `https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`,

            {
                method: "POST",

                headers: {
                    "Authorization":
                        `Bearer ${env.CF_EMAIL_API_TOKEN}`,

                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    to: env.ENQUIRY_RECIPIENT,

                    from: env.ENQUIRY_SENDER,

                    subject,

                    text: emailBody

                }),

                signal: AbortSignal.timeout(15000)

            }
        );

        const emailResult =
            await emailResponse.json();

        const delivered =
            emailResult.result?.delivered || [];

        const queued =
            emailResult.result?.queued || [];

        const accepted =
            delivered.includes(env.ENQUIRY_RECIPIENT) ||
            queued.includes(env.ENQUIRY_RECIPIENT);

        if (
            !emailResponse.ok ||
            !emailResult.success ||
            !accepted
        ) {

            console.error(
                "Email provider rejected enquiry",
                reference,
                emailResponse.status
            );

            return jsonResponse(
                {
                    success: false,
                    message:
                        "Unable to deliver your enquiry."
                },
                502
            );

        }

        /* Log metadata only, not customer information */

        console.log(
            "Enquiry accepted",
            reference,
            department
        );

        return jsonResponse(
            {
                success: true,
                reference,
                message: "Enquiry received for processing."
            }
        );

    } catch (error) {

        console.error(
            "Enquiry processing failed",
            error.name
        );

        return jsonResponse(
            {
                success: false,
                message:
                    "Unable to process your enquiry at this time."
            },
            500
        );

    }
}
