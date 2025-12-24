export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// ✅ Validate environment variables at startup
const EnvSchema = z.object({
  SMTP_HOST: z.string().min(1, "SMTP_HOST is required"),
  SMTP_PORT: z.coerce.number().positive(),
  SMTP_USER: z.string().email("SMTP_USER must be valid email"),
  SMTP_PASS: z.string().min(1, "SMTP_PASS is required"),
  EMAIL_TO: z.string().email("EMAIL_TO must be valid email"),
});

// Parse once at module load - fail fast if config is wrong
let env: z.infer<typeof EnvSchema>;
try {
  env = EnvSchema.parse(process.env);
} catch (error) {
  console.error("❌ SMTP Configuration Error:", error);
  throw new Error("Missing or invalid SMTP environment variables");
}

// ✅ Validate request body
const BodySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email format"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export async function POST(req: NextRequest) {
  try {
    // 1. Get client info for logging
    const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

    // 2. Validate request body
    const json = await req.json();
    const parsed = BodySchema.parse(json);

    console.log("📧 Attempting to send email from:", parsed.email);

    // 3. Create transporter
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_PORT === 465, // true for 465, false for 587
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    // 4. Verify SMTP connection
    try {
      await transporter.verify();
      console.log("✅ SMTP connection verified");
    } catch (error) {
      console.error("❌ SMTP verification failed:", error);
      return NextResponse.json(
        {
          ok: false,
          message: "Email service is temporarily unavailable. Please try again later.",
          code: "SMTP_UNAVAILABLE"
        },
        { status: 503 }
      );
    }

    // 5. Send email to you (the portfolio owner)
    const mailOptions = {
      from: `"Portfolio Contact" <${env.SMTP_USER}>`,
      to: env.EMAIL_TO,
      replyTo: parsed.email, // When you click "Reply", it goes to the client's email
      subject: `📬 New Contact: ${parsed.name}`,
      text: `
Name: ${parsed.name}
Email: ${parsed.email}

Message:
${parsed.message}

---
Sent from: ${ip}
Time: ${new Date().toISOString()}
      `.trim(),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2C3E36;">📬 New Contact Form Submission</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${parsed.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${parsed.email}">${parsed.email}</a></p>
          </div>
          <div style="background: #fff; padding: 20px; border-left: 4px solid #8BA49A; margin: 20px 0;">
            <h3 style="margin-top: 0;">Message:</h3>
            <p style="white-space: pre-wrap;">${parsed.message}</p>
          </div>
          <div style="font-size: 12px; color: #64748b; margin-top: 20px;">
            <p>Sent from IP: ${ip}</p>
            <p>Time: ${new Date().toLocaleString()}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <p style="font-size: 12px; color: #64748b;">
            💡 <strong>Tip:</strong> Just click "Reply" to respond directly to this client!
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", env.EMAIL_TO);

    return NextResponse.json(
      {
        ok: true,
        message: "Thank you! Your message has been sent successfully."
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("❌ Contact form error:", err);

    // Handle Zod validation errors
    if (err instanceof z.ZodError) {
      const firstError = err.issues[0];
      console.error("❌ Zod validation error:", firstError);
      return NextResponse.json(
        {
          ok: false,
          message: firstError.message,
          code: "VALIDATION_ERROR"
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to send message. Please try again or contact us directly.",
        code: "INTERNAL_ERROR"
      },
      { status: 500 }
    );
  }
}