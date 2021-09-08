import { Request, Response } from "express";

import * as service from "@/services/client/hotelReservation";

export async function getReservation(req: Request, res: Response) {
  const userId  = req.params.userId;
  const reservation = await service.getReservation(userId);
  res.send(reservation);
}
