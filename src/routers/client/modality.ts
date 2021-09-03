import { Router } from "express";

import * as controller from "@/controllers/client/modality";

const router = Router();

router.get("/", controller.getAllModalities);

export default router;
