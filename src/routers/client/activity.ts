import { Router } from "express";

import * as controller from "@/controllers/client/activity";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import activitySchema from "@/schemas/activitySchema";

const router = Router();

router.get("/", controller.getAllDates);
router.post(
  "/",
  schemaValidatingMiddleware(activitySchema),
  controller.getActivitiesByDates
);
router.post(
  "/seat/:id",
  controller.subscribe
);

export default router;
