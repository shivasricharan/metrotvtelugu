export async function POST(request) {
  try {
    const body = await request.json();

    const scriptUrl = process.env.GOOGLE_SCRIPT_METRO_ENQUIRY_URL;

    if (!scriptUrl) {
      return Response.json(
        { success: false, message: "Google Script URL is not configured" },
        { status: 500 }
      );
    }

    const requiredFields = ["name", "phone", "enquiryType", "message"];

    for (const field of requiredFields) {
      if (!body[field] || String(body[field]).trim() === "") {
        return Response.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const payload = {
      name: body.name || "",
      email: body.email || "",
      phone: body.phone || "",
      company: body.company || "",
      enquiryType: body.enquiryType || "",
      message: body.message || "",
      source: "Metro TV Website",
      page: body.page || "/contact",
      userAgent: request.headers.get("user-agent") || "",
    };

    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    let googleResponse = null;

    try {
      googleResponse = JSON.parse(text);
    } catch {
      googleResponse = { raw: text };
    }

    if (!response.ok || googleResponse?.success === false) {
      return Response.json(
        {
          success: false,
          message:
            googleResponse?.message ||
            "Unable to save enquiry to Google Sheets",
          googleResponse,
        },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: "Enquiry submitted successfully",
      googleResponse,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Something went wrong while submitting the enquiry",
        error: error.message,
      },
      { status: 500 }
    );
  }
}