"use server";

import { Resend } from "resend";

const CONTACT_EMAIL = "koryucreatives@gmail.com";

type ContactPayload = {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
};

export async function sendContactEmail(data: ContactPayload) {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — see .env.local");
    return { success: false as const };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: "KORYU Creatives <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: data.email,
      subject: `New inquiry from ${data.name} (${data.businessType})`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "Not provided"}\nBusiness type: ${data.businessType}\n\nMessage:\n${data.message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false as const };
    }

    return { success: true as const };
  } catch (err) {
    console.error("Failed to send contact email:", err);
    return { success: false as const };
  }
}
