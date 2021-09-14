import User from "@/entities/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import sgMail from "@sendgrid/mail";

export async function sendToken(email: string) {
  await User.verifyEmail(email);
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60*60 });
  const link = `${process.env.FRONT_URL}/resetPassword/${token}`;
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const mail= {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Password change request",
    text: `Please click on the following link ${link} to reset your password. \n\n 
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  };
  await sgMail.send(mail);
}

export async function verifyTokenValidation(token: string) {
  const { email } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  await User.verifyEmail(email);
  return false;
}

export async function resetPassword() {
  return false;
}
