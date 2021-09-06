import { Request, Response } from "express";

import * as service from "@/services/client/hotel";

export async function get(_req: Request, res: Response) {
  const hotels = await service.get();
  res.send(hotels);
}
export async function getOne(req: Request, res: Response) {
  const  id  = req.params.id;
  const hotel = await service.getOne(Number(id));
  res.send(hotel);
}
