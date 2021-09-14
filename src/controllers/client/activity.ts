import { Request, Response } from "express";

import * as activityService from "@/services/client/activity";
import httpStatus from "http-status";

export async function getAllDates(req: Request, res: Response) {
  const result = await activityService.getAllDates();
  res.send(result).status(200);
}

export async function getActivitiesByDates(req: Request, res: Response) {
  const userId = req.user.id;
  const date = req.body.date;

  const newDate = new Date(date);

  const result = await activityService.getActivitiesByDate(newDate, userId);
  res.send(result).status(200);
}

export async function subscribe(req: Request, res: Response) {
  const activityId = Number(req.params.id);
  const userId = req.user.id;
  const result = await activityService.subscribe(userId, activityId);
  return res.sendStatus(httpStatus.CREATED);
}
