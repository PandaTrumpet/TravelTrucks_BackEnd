import { Router } from "express";
import waterRouter from "./water.js";
import userRouter from "./users.js";
const router = Router();
router.use("/auth", userRouter);
router.use("/water", waterRouter);
export default router;
