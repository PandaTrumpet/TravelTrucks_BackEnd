import { Router } from "express";
import waterRouter from "./water.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";
const router = Router();
router.use("/api/auth", authRouter);
router.use("/api/water", waterRouter);
router.use("/api/user", userRouter);
export default router;
