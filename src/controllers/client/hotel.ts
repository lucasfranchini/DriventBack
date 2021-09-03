import { Request, Response } from "express";

import * as service from "@/services/client/hotel";

export async function get(_req: Request, res: Response) {
  const hotels = await service.get();
  res.send(hotels);
}
