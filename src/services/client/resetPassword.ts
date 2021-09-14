import User from "@/entities/User";
import jwt, { JwtPayload } from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
import InvalidTokenError from "@/errors/InvalidTokenError";

export async function sendToken(email: string) {
  await User.verifyEmail(email);
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60*60 });
  const link = `${process.env.FRONT_URL}/reset-password/${token}`;
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
  let email: string;
  try{
    const jwtVerified = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    email= jwtVerified.email;
  }
  catch{
    throw new InvalidTokenError();
  }
  return email;
}

export async function resetPassword(token: string, newPassword: string) {
  const email =await verifyTokenValidation(token);
  const user = await User.verifyEmail(email);
  await user.changePassword(newPassword);
}
