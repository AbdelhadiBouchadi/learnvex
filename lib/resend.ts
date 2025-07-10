import "server-only";

import { Resend } from "resend";
import { env } from "./env";
import { EmailTemplate } from "@/components/email/EmailTemplate";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  firstName: string,
  otp: string,
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "LearnVex <onboarding@resend.dev>",
      to: [email],
      subject: "LearnVex - Verify Your Email Address",
      react: EmailTemplate({ firstName, otp }) as React.ReactNode,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send verification email");
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
}
