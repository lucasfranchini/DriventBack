import { Router } from "express";

import * as controller from "@/controllers/client/hotelReservation";

const router = Router();

router.get("/:userId", controller.getReservation);

export default router;
