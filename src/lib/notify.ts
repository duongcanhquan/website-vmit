export type MailStatus = "sent" | "not_configured" | "failed"

export async function deliverEmail(input: { to: string[]; subject: string; text: string }): Promise<MailStatus> {
  const key = process.env.RESEND_API_KEY?.trim()
  const from = process.env.NOTIFY_FROM_EMAIL?.trim()
  const recipients = [...new Set(input.to.map((item) => item.trim()).filter(Boolean))]
  if (!key || !from || recipients.length === 0) return "not_configured"

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: recipients,
      subject: input.subject,
      text: input.text,
    }),
  })
  return response.ok ? "sent" : "failed"
}
