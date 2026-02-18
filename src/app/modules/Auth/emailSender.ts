import nodemailer from "nodemailer";
import config from "../../../config";

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
      user: config.emailSender.email,
      pass: config.emailSender.app_pass,
    },
    tls: {
      rejectUnauthorized: false, // Allow self-signed certificates (for development)
    },
  });

  // Send an email using async/await

  const info = await transporter.sendMail({
    from: '"Health Care" <imashiqe@gmail.com>',
    to: email,
    subject: "Password Reset Link",
    text: "Hello world?", // Plain-text version of the message
    html, // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
};

export default emailSender;
