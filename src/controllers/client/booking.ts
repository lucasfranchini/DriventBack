import { Request, Response } from "express";

import * as bookingService from "@/services/client/booking";
import BookingData from "@/interfaces/booking";

export async function saveBookingInfo(req: Request, res: Response) {
  const bookingData = req.body as BookingData;
  bookingData.userId = req.user.id;
  await bookingService.createNewBooking(bookingData);
  res.sendStatus(201);
}

export async function getBookingInfo(req: Request, res: Response) {
  const userId = req.user.id;
  const result = await bookingService.getUserBooking(userId);
  if (!result) return res.sendStatus(401);
  res.send(result).status(200);
}
