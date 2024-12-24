import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import {
  userInformationController,
  upsertUserController,
  allUsersController,
} from "../controllers/auth.js";
import { upsertUsersSchema } from "../validation/user.js";
import { upload } from "../middlewares/multer.js";
const userRouter = Router();
userRouter.get("/:userId", ctrlWrapper(userInformationController));
userRouter.put(
  "/:userId",
  upload.single("avatar"),
  validateBody(upsertUsersSchema),

  ctrlWrapper(upsertUserController)
);
userRouter.get("/allUsers", allUsersController);
export default userRouter;
