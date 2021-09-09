import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import modalityRouter from "@/routers/client/modality";
import lodgeRouter from "@/routers/client/lodge";
import hotelRouter from "@/routers/client/hotel";
import hotelReservationRouter from "@/routers/client/hotelReservation";
import bookingRouter from "@/routers/client/booking";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/modalities", modalityRouter);
router.use("/lodges", lodgeRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);
router.use("/hotels", tokenValidationMiddleware, hotelRouter);
router.use("/hotelReservations", tokenValidationMiddleware, hotelReservationRouter);
router.use("/bookings", tokenValidationMiddleware, bookingRouter);

export default router;
