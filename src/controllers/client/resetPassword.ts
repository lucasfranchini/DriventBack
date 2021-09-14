import { Request, Response } from "express";
import * as resetPasswordService from "@/services/client/resetPassword";

export async function sendToken(req: Request, res: Response) {
  const { email }= req.body;
  resetPasswordService.sendToken(email);
  res.sendStatus(200);
}

export async function verifyTokenValidation(req: Request, res: Response) {
  res.sendStatus(200);
}

export async function resetPassword(req: Request, res: Response) {
  res.sendStatus(200);
}
