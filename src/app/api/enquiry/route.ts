import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { name, email, projectType, description, timeline } = body;

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: "Name, email, and description are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address format" }, { status: 400 });
    }

    // Check if Resend or standard email provider key is configured
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Ask Cold Representative <onboarding@resend.dev>",
          to: ["abolarintaye20@gmail.com"],
          reply_to: email,
          subject: `[Ask Cold Enquiry] ${projectType} from ${name}`,
          text: `New project enquiry collected via Ask Cold AI Representative:\n\nName: ${name}\nEmail: ${email}\nProject Type: ${projectType}\nTimeline/Budget: ${timeline || "Not specified"}\n\nProject Overview:\n${description}\n\nTimestamp: ${new Date().toISOString()}`,
        }),
      });

      if (emailRes.ok) {
        return NextResponse.json({
          success: true,
          delivered: true,
          message: "Enquiry successfully delivered to Taye Abolarin.",
        });
      }
    }

    // If email service provider is not configured, signal the client to use the direct prefilled mailto fallback
    return NextResponse.json({
      success: false,
      reason: "email_service_unconfigured",
      message: "Direct server email delivery is not configured on this environment. Fallback to direct client mailto.",
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error("Enquiry API error:", errorMsg);
    return NextResponse.json(
      { error: "Internal server error processing enquiry" },
      { status: 500 }
    );
  }
}
