import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import {
  loginUsersSchema,
  registerUsersSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  refreshUserSessionController,
  requestResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
  loginWithGoogleController,
} from "../controllers/auth.js";
// import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.post(
  "/register",
  validateBody(registerUsersSchema),
  ctrlWrapper(registerUserController)
);
router.post(
  "/login",
  validateBody(loginUsersSchema),
  ctrlWrapper(loginUserController)
);
router.post("/logout", ctrlWrapper(logoutUserController));
router.post("/refresh", ctrlWrapper(refreshUserSessionController));
router.post(
  "/reset-password",
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController)
);
router.post(
  "/request-reset-email",
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController)
);
router.get("/get-oauth-url", ctrlWrapper(getGoogleOAuthUrlController));
router.post("/confirm-oauth", ctrlWrapper(loginWithGoogleController));
export default router;
