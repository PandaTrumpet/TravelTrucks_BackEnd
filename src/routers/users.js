import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { loginUsersSchema, registerUsersSchema } from "../validation/users.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  refreshUserSessionController,
} from "../controllers/auth.js";

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
export default router;
