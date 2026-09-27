import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  // TODO: wire to Resend — add RESEND_API_KEY to .env.local
  console.log("Contact form:", { name, email, message });
  return NextResponse.json({ success: true });
}
