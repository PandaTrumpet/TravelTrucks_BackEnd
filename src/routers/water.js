import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  createWaterController,
  getWaterByIdController,
  getWaterController,
} from "../controllers/water.js";
const router = Router();

router.get("/", ctrlWrapper(getWaterController));
router.get("/:waterId", ctrlWrapper(getWaterByIdController));
router.post("/", ctrlWrapper(createWaterController));
export default router;
