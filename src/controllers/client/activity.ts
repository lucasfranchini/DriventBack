import { Request, Response } from "express";

import * as activityService from "@/services/client/activity";

export async function getAllDates(req: Request, res: Response) {
  const result = await activityService.getAllDates();
  res.send(result).status(200);
}
