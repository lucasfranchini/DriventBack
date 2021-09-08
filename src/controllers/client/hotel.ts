import { Request, Response } from "express";

import * as service from "@/services/client/hotel";
import InvalidDataError from "@/errors/InvalidData";
import httpStatus from "http-status";

export async function get(_req: Request, res: Response) {
  const hotels = await service.get();
  res.send(hotels);
}

export async function getOne(req: Request, res: Response) {
  const  id  = req.params.id;
  const hotel = await service.getOne(Number(id));
  res.send(hotel);
}

export async function ReserveHotelRoom(req: Request, res: Response) {
  const  hotelId = Number(req.params.hotelId);
  const  roomId = Number(req.params.roomId);
  const userId = req.user.id;

  if(hotelId < 1 || isNaN(hotelId)) throw new InvalidDataError("hotel Id", ["hotel Id must be a number greater than 0", `${hotelId}`]); 
  if(roomId <1 || isNaN(roomId)) throw new InvalidDataError("room Id", ["room Id must be a number greater than 0", `${roomId}`]);
  await service.ReserveHotelRoom(hotelId, roomId, userId);
  res.sendStatus(httpStatus.CREATED);
}
