import { Request, Response } from "express";

import * as bookingService from "@/services/client/booking";
import BookingData from "@/interfaces/booking";

export async function saveBookingInfo(req: Request, res: Response) {
  const bookingData = req.body as BookingData;
  bookingData.userId = req.user.id;
  await bookingService.createNewBooking(bookingData);
  res.sendStatus(201);
}
