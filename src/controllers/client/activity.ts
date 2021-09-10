import { Request, Response } from "express";

import * as activityService from "@/services/client/activity";

export async function getAllDates(req: Request, res: Response) {
  const result = await activityService.getAllDates();
  res.send(result).status(200);
}

export async function getActivitiesByDates(req: Request, res: Response) {
  const date = req.body.date;

  const newDate = new Date(date);

  const result = await activityService.getActivitiesByDate(newDate);
  res.send(result).status(200);
}
