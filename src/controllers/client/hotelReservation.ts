import { Request, Response } from "express";
import InvalidDataError from "@/errors/InvalidData";
import httpStatus from "http-status";
import * as service from "@/services/client/hotelReservation";

export async function ReserveHotelRoom(req: Request, res: Response) {
  const  hotelId = Number(req.params.hotelId);
  const  roomId = Number(req.params.roomId);
  const userId = req.user.id;

  if(hotelId < 1 || isNaN(hotelId)) throw new InvalidDataError("hotel Id", ["hotel Id must be a number greater than 0", `${hotelId}`]); 
  if(roomId <1 || isNaN(roomId)) throw new InvalidDataError("room Id", ["room Id must be a number greater than 0", `${roomId}`]);
  await service.ReserveHotelRoom(hotelId, roomId, userId);
  res.sendStatus(httpStatus.CREATED);
}
