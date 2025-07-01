import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(to: string, resetUrl: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: `"SIGGFlow" <${process.env.SMTP_USER}>`,
    to,
    subject: "Redefinição de senha - SIGGFlow",
    html: `
      <div style="font-family: Arial, sans-serif; color: #222;">
        <h2>Redefinição de senha</h2>
        <p>Olá,</p>
        <p>Recebemos uma solicitação para redefinir sua senha. Para continuar, clique no botão abaixo:</p>
        <a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#219EBC;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;">Redefinir senha</a>
        <p>Se você não solicitou, ignore este email.</p>
        <p style="font-size:12px;color:#888;">Este link é válido por 1 hora.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
} 