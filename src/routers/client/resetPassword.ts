import { Router } from "express";

import * as controller from "@/controllers/client/resetPassword";

const router = Router();

router.post("/token", controller.sendToken);

router.get("/:token", controller.verifyTokenValidation);

router.post("/:token", controller.resetPassword);

export default router;
