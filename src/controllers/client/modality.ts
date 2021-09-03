import { Request, Response } from "express";
import httpStatus from "http-status";

import * as modalityService from "@/services/client/modality";

export async function getAllModalities(_req: Request, res: Response) {
  const modalities = await modalityService.getModalities();
  if (modalities.length === 0) return res.sendStatus(204);
  res.send(modalities).status(httpStatus.OK);
}
