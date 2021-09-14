import User from "@/entities/User";
import InvalidEmailError from "@/errors/InvalidEmail";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function sendToken(email: string) {
  const user = await User.findOne({ where: { email } });
  if(!user) throw new InvalidEmailError(email);
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 60*60 });
}

export async function verifyTokenValidation(token: string) {
  const { email } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  return false;
}

export async function resetPassword() {
  return false;
}
