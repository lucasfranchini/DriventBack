import { Request, Response } from "express";
import httpStatus from "http-status";

import * as lodgeService from "@/services/client/lodge";

export async function getLodgeOptions(_req: Request, res: Response) {
  const lodgeOptions = await lodgeService.getLodgeOptions();
  res.send(lodgeOptions).status(httpStatus.OK);
}
