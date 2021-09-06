import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/", controller.get);

router.get("/:id", controller.getOne);

export default router;
