import { Router } from "express";

import * as controller from "@/controllers/client/booking";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import bookingSchema from "@/schemas/bookingSchema";

const router = Router();

router.post(
  "/",
  schemaValidatingMiddleware(bookingSchema),
  controller.saveBookingInfo
);

router.put(
  "/",
  controller.payBooking
);

router.get("/", controller.getBookingInfo);

export default router;
