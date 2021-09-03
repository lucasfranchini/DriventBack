import { Request, Response } from "express";
import httpStatus from "http-status";

import * as lodgeService from "@/services/client/lodge";

export async function getLodgeOptions(_req: Request, res: Response) {
  const lodgeOptions = await lodgeService.getLodgeOptions();
  if (lodgeOptions.length === 0) return res.sendStatus(204);
  res.send(lodgeOptions).status(httpStatus.OK);
}
