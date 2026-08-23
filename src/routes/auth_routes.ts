import Router from "express";
import { signUpController,signInController } from "../controllers/auth_controllers";
import { validate } from "../middlewares/validation";
import { SignUpSchema } from "../validator/auth_validator";
import { SignInSchema } from "../validator/auth_validator";
import { authLimiter } from "../middlewares/rate_limiter";

const router=Router();


router.post("/signup",validate(SignUpSchema),signUpController);
router.post("/signin",authLimiter,validate(SignInSchema),signInController);


export default router;