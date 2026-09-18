"use server";

import { Resend } from "resend";

export async function sendContactMessage(
  _prevState: unknown,
  formData: FormData,
) {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "Please fill in all fields.", success: false };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: process.env.CRON_FROM_EMAIL!,
    to: process.env.ADMIN_NOTIFICATION_EMAIL!,
    replyTo: email,
    subject: `New enquiry from ${name} — website contact form`,
    html: `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `,
  });

  if (error) {
    return { error: "Something went wrong. Please try again.", success: false };
  }

  return { error: null, success: true };
}
