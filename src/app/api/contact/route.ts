import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Rate limiting: in-memory map, resets every 15 minutes ──────
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) return false;
  record.count++;
  return true;
}

function sanitize(str: string, maxLen = 500): string {
  return str.replace(/<[^>]*>/g, "").trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ── Honeypot (spam bots fill hidden fields) ──────────────
    if (body.website || body.phone_number) {
      return NextResponse.json({ success: true }); // Silently succeed
    }

    const name    = sanitize(String(body.name    || ""), 80);
    const email   = sanitize(String(body.email   || ""), 120);
    const message = sanitize(String(body.message || ""), 2000);

    if (!name || name.length < 2)
      return NextResponse.json({ error: "Name is required (min 2 chars)." }, { status: 400 });
    if (!email || !isValidEmail(email))
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    if (!message || message.length < 10)
      return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });

    // ── Rate limiting ──────────────────────────────────────────
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait 15 minutes." },
        { status: 429 }
      );
    }

    // ── Send email via Nodemailer ──────────────────────────────
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.warn("[Contact API] No SMTP credentials — logging instead.");
      console.log({ name, email, message });
      return NextResponse.json({ success: true });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT ?? "587", 10),
      secure: false,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"Web-Verse Contact" <${smtpUser}>`,
      to: "joycesondanielraj71@gmail.com",
      replyTo: email,
      subject: `🕷️ New Signal Beacon from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<div style="font-family:monospace;background:#080810;color:#e8e8ec;padding:24px;border:1px solid #CC0000">
        <h2 style="color:#CC0000">🕷️ New Signal Beacon</h2>
        <p><strong style="color:#0047FF">From:</strong> ${name} &lt;${email}&gt;</p>
        <hr style="border-color:#CC000030" />
        <p style="white-space:pre-wrap">${message}</p>
      </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API] Error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
