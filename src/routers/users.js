import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { loginUsersSchema, registerUsersSchema } from "../validation/users.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { registerUserController } from "../controllers/auth.js";

const router = Router();
router.post(
  "/register",
  validateBody(registerUsersSchema),
  ctrlWrapper(registerUserController)
);
router.post("/login", validateBody(loginUsersSchema), ctrlWrapper());
export default router;
