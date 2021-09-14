import User from "@/entities/User";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function sendToken(email: string) {
  await User.verifyEmail(email);
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60*60 });
}

export async function verifyTokenValidation(token: string) {
  const { email } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  await User.verifyEmail(email);
  return false;
}

export async function resetPassword() {
  return false;
}
