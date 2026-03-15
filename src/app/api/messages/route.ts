import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { senderEmail, senderName, company, message } = body;

    if (!senderEmail || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    // In production, insert into Supabase
    console.log("New message:", { senderEmail, senderName, company });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
