import { Router } from "express";

import * as controller from "@/controllers/client/lodge";

const router = Router();

router.get("/", controller.getLodgeOptions);

export default router;
