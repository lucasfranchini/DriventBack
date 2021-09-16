import { Request, Response } from "express";
import httpStatus from "http-status";

import * as service from "@/services/client/user";

export async function signUp(req: Request, res: Response) {
  const user = await service.createNewUser(req.body.email, req.body.password);
  res.status(httpStatus.CREATED).send(user);
}

export async function saveProfilePicture(req: Request, res: Response) {
  const userId = req.body.userId;
  const picture = await service.saveProfilePicture(req.body.url, userId);
  res.status(httpStatus.CREATED).send(picture);
}
