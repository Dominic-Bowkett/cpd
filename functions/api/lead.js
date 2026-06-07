/**
 * Cloudflare Pages Function — POST /api/lead
 * Receives a signup / enquiry form and emails it to you via Resend.
 *
 * The SignupForm component defaults to mailto (no backend needed). Switch it to
 * mode="post" once this is configured, or repoint it at your email/CRM provider.
 *
 * Required Pages environment variable (set as a SECRET, never commit it):
 *   RESEND_API_KEY   — your Resend API key (starts "re_...")
 *
 * Optional Pages environment variables (plain text is fine):
 *   LEAD_TO    — where signups/enquiries are delivered. Default: hello@surveyorcpdhub.co.uk
 *   LEAD_FROM  — verified Resend sender. Default: "Surveyor CPD Hub <noreply@surveyorcpdhub.co.uk>"
 *                (the domain must be verified in Resend)
 */

const DEFAULT_TO = "hello@surveyorcpdhub.co.uk";
const DEFAULT_FROM = "Surveyor CPD Hub <noreply@surveyorcpdhub.co.uk>";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function htmlPage(title, message) {
  return new Response(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">` +
      `<title>${title}</title>` +
      `<body style="font-family:system-ui,sans-serif;max-width:36rem;margin:4rem auto;padding:0 1rem;color:#0e1726">` +
      `<h1 style="color:#1d4ed8">${title}</h1><p>${message}</p>` +
      `<p><a href="/" style="color:#1d4ed8">Back to the site</a></p></body>`,
    { headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

function esc(s) {
  return String(s).replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Does the client expect JSON (our fetch) or a full page (no-JS fallback)?
  const wantsJson = (request.headers.get("accept") || "").includes("application/json");

  let body;
  try {
    const ct = request.headers.get("content-type") || "";
    if (ct.includes("application/json")) {
      body = await request.json();
    } else {
      const form = await request.formData();
      body = Object.fromEntries(form.entries());
    }
  } catch {
    return wantsJson
      ? json({ ok: false, error: "Invalid request." }, 400)
      : htmlPage("Something went wrong", "We couldn't read your message. Please go back and try again.");
  }

  // Honeypot — bots fill the hidden "company" field. Pretend success.
  if (body.company || body._gotcha) {
    return wantsJson ? json({ ok: true }) : htmlPage("Thank you", "You're on the list.");
  }

  const name = (body.name || "").toString().trim().slice(0, 200);
  const email = (body.email || "").toString().trim().slice(0, 200);
  const role = (body.role || "").toString().trim().slice(0, 50);
  const source = (body.source || "").toString().trim().slice(0, 120);
  const message = (body.situation || body.message || "").toString().trim().slice(0, 5000);

  const emailValid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);
  if (!name || !emailValid) {
    const msg = "Please provide your name and a valid email address.";
    return wantsJson ? json({ ok: false, error: msg }, 422) : htmlPage("Please check the form", msg);
  }

  if (!env.RESEND_API_KEY) {
    return wantsJson
      ? json({ ok: false, error: "Email isn’t configured yet. Please email us directly." }, 503)
      : htmlPage("Not configured yet", "Please email us directly at " + DEFAULT_TO + ".");
  }

  const to = env.LEAD_TO || DEFAULT_TO;
  const from = env.LEAD_FROM || DEFAULT_FROM;
  const subject = `Signup/enquiry (${source || "site"}) — ${name}`;

  const text =
    `New signup/enquiry from the Surveyor CPD Hub website\n\n` +
    `Name: ${name}\n` +
    `Email: ${email}\n` +
    `Stage: ${role || "—"}\n` +
    `Source: ${source || "—"}\n\n` +
    `Message:\n${message || "—"}\n`;

  const html =
    `<h2>New signup / enquiry</h2>` +
    `<p><strong>Name:</strong> ${esc(name)}<br>` +
    `<strong>Email:</strong> ${esc(email)}<br>` +
    `<strong>Stage:</strong> ${esc(role) || "—"}<br>` +
    `<strong>Source:</strong> ${esc(source) || "—"}</p>` +
    `<p><strong>Message:</strong><br>${esc(message).replace(/\n/g, "<br>") || "—"}</p>`;

  let res;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email, // so you can reply straight to the subscriber
        subject,
        text,
        html,
      }),
    });
  } catch {
    const msg = "We couldn’t send your message right now. Please try again shortly.";
    return wantsJson ? json({ ok: false, error: msg }, 502) : htmlPage("Try again", msg);
  }

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.log("Resend error", res.status, detail);
    const msg = "We couldn’t send your message right now. Please try again shortly.";
    return wantsJson ? json({ ok: false, error: msg }, 502) : htmlPage("Try again", msg);
  }

  return wantsJson
    ? json({ ok: true, message: "Thanks — you’re on the list. Check your inbox for the next roundup." })
    : htmlPage("Thank you", "You’re on the list — we’ll be in touch.");
}

// Reject non-POST methods cleanly.
export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed." }, 405);
  }
  return onRequestPost(context);
}
