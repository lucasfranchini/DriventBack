import { Router } from "express";

import * as controller from "@/controllers/client/activity";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import activitySchema from "@/schemas/activitySchema";
import seatSchema from "@/schemas/seatSchema";

const router = Router();

router.get("/", controller.getAllDates);
router.post(
  "/",
  schemaValidatingMiddleware(activitySchema),
  controller.getActivitiesByDates
);
router.post(
  "/seat",
  schemaValidatingMiddleware(seatSchema),
  controller.subscribe
);

export default router;
