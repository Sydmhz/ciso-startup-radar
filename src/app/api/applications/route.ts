import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, title, company, workEmail } = body;

    // Validate required fields
    if (!fullName || !title || !company || !workEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production, this would insert into Supabase using all body fields
    // const supabase = await createServiceClient();
    // if (supabase) {
    //   await supabase.from("ciso_applications").insert({
    //     full_name: body.fullName,
    //     title: body.title,
    //     company: body.company,
    //     linkedin_url: body.linkedinUrl,
    //     work_email: body.workEmail,
    //     certifications: body.certifications,
    //     referral_source: body.referralSource,
    //   });
    // }

    console.log("New CISO application:", { fullName, company, workEmail });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
