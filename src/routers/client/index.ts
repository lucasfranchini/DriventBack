import { Router } from "express";

import eventRouter from "@/routers/client/event";
import userRouter from "@/routers/client/user";
import authRouter from "@/routers/client/auth";
import enrollmentRouter from "@/routers/client/enrollment";
import modalityRouter from "@/routers/client/modality";
import lodgeRouter from "@/routers/client/lodge";

import tokenValidationMiddleware from "@/middlewares/tokenValidationMiddleware";

const router = Router();

router.use("/event", eventRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);
router.use("/modalities", modalityRouter);
router.use("/lodges", lodgeRouter);
router.use("/enrollments", tokenValidationMiddleware, enrollmentRouter);

export default router;
