import { Router } from "express";

import * as controller from "@/controllers/client/user";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";
import createNewUserSchema from "@/schemas/createNewUser";
import pictureUrlSchema from "@/schemas/pictureUrlSchema";

const router = Router();

router.post("/", schemaValidatingMiddleware(createNewUserSchema), controller.signUp);

router.post("/picture", schemaValidatingMiddleware(pictureUrlSchema), controller.saveProfilePicture);

export default router;
