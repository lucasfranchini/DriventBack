import { Router } from "express";

import * as controller from "@/controllers/client/activity";

const router = Router();

router.get("/", controller.getAllDates);

export default router;
