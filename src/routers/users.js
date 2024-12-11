import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import {
  loginUsersSchema,
  registerUsersSchema,
  upsertUsersSchema,
} from "../validation/users.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  refreshUserSessionController,
  userInformationController,
  upsertUserController,
  allUsersController,
} from "../controllers/auth.js";
// import { authenticate } from "../middlewares/authenticate.js";

const router = Router();
// router.use(authenticate);
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
router.get("/:userId", ctrlWrapper(userInformationController));
router.put(
  "/:userId",
  validateBody(upsertUsersSchema),
  ctrlWrapper(upsertUserController)
);
router.get("/allUsers", allUsersController);
export default router;
