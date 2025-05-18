import { NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend with your API key from environment variables
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

export async function POST(request: Request) {
  try {
    // Check if Resend is properly initialized
    if (!resend) {
      console.error("Resend API key is missing")
      return NextResponse.json({ error: "Email service configuration error" }, { status: 500 })
    }

    const body = await request.json()
    const { name, email, phone, service, date, size, notes } = body

    // Validate required fields
    if (!name || !email || !phone || !service || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Format the date
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    // Send notification email to you (the business owner)
    const ownerNotification = await resend.emails.send({
      from: "Braids by Beth <notifications@braidsbybeth.com>",
      to: "bethaneym01@gmail.com", // Replace with your email
      subject: `New Booking: ${name} for ${service}`,
      html: `
        <h1>New Booking Request</h1>
        <p><strong>Client:</strong> ${name}</p>
        <p><strong>Service:</strong> ${service} ${size ? `(${size})` : ""}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Contact:</strong> ${phone} | ${email}</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ""}
        <p>Please confirm this appointment with the client.</p>
      `,
    })

    // Send confirmation email to the client
    const clientConfirmation = await resend.emails.send({
      from: "Braids by Beth <bookings@braidsbybeth.com>",
      to: email,
      subject: "Your Booking Request Confirmation",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #ff0000;">Braids by Beth</h1>
            <p style="font-size: 18px;">Thank you for your booking request!</p>
          </div>
          
          <div style="background-color: #f8f8f8; border-left: 4px solid #ff0000; padding: 15px; margin-bottom: 20px;">
            <p>Hi ${name},</p>
            <p>We've received your booking request for <strong>${service} ${size ? `(${size})` : ""}</strong> on <strong>${formattedDate}</strong>.</p>
            <p>This is a <strong>pending request</strong> until confirmed. A $15 deposit is required to secure your appointment.</p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h2 style="color: #ff0000; font-size: 18px;">Next Steps:</h2>
            <ol style="padding-left: 20px;">
              <li>I'll contact you shortly via text at ${phone} to confirm your appointment.</li>
              <li>I'll provide instructions for the $15 deposit payment.</li>
              <li>Once your deposit is received, your appointment will be confirmed.</li>
              <li>Remember to drop off your hair at least 1 day before your appointment.</li>
            </ol>
          </div>
          
          <div style="background-color: #f8f8f8; padding: 15px; margin-bottom: 20px;">
            <h2 style="color: #ff0000; font-size: 18px;">Booking Details:</h2>
            <p><strong>Service:</strong> ${service} ${size ? `(${size})` : ""}</p>
            <p><strong>Date:</strong> ${formattedDate}</p>
            <p><strong>Your Contact:</strong> ${phone}</p>
            ${notes ? `<p><strong>Your Notes:</strong> ${notes}</p>` : ""}
          </div>
          
          <div style="margin-top: 30px; font-size: 14px; color: #666; border-top: 1px solid #eee; padding-top: 20px;">
            <p>If you need to cancel or reschedule, please provide at least 24 hours notice to receive a full deposit refund.</p>
            <p>For any questions, please reply to this email or text me directly.</p>
            <p style="text-align: center; margin-top: 20px;">© ${new Date().getFullYear()} Braids by Beth. All rights reserved.</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json(
      {
        success: true,
        message: "Booking request submitted successfully",
        ownerEmail: ownerNotification,
        clientEmail: clientConfirmation,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error sending email:", error)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
