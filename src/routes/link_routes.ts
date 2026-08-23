import Router from "express";
import {authMiddleware} from "../middlewares/auth_middleware";
import { createLinkSchema,redirectLinkSchema } from "../validator/link_validator";
import { validate ,validateParams} from "../middlewares/validation";
import { createLinkController,redirectLinkController } from "../controllers/link_controllers";
import { linkLimiter } from "../middlewares/rate_limiter";
const router=Router();




router.post("/",authMiddleware,linkLimiter,validate(createLinkSchema),createLinkController);
router.get("/:shortCode",validateParams(redirectLinkSchema),redirectLinkController);

export default router;
