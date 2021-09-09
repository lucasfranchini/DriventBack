import { Request, Response } from "express";

import * as service from "@/services/client/hotelReservation";

export async function getReservation(req: Request, res: Response) {
  const userId  = Number(req.params.id);
  const reservation = await service.getReservation(userId);
  res.send(reservation);
}
