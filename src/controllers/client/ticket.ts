import { Request, Response } from "express";
import httpStatus from "http-status";

import * as ticketService from "@/services/client/ticket";

/*export async function getEnrollmentInfos(req: Request, res: Response) {
  const enrollmentInfo = await enrollmentService.getEnrollmentWithAddress(
    req.user.id
  );

  if (!enrollmentInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(enrollmentInfo).status(httpStatus.OK);
}*/

export async function getTickets(_req: Request, res: Response) {
  const ticketInfo = await ticketService.getTickets();

  res.send(ticketInfo).status(httpStatus.OK);
}
