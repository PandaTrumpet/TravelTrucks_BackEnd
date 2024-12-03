import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  createWaterController,
  deleteWaterController,
  getWaterByIdController,
  getWaterController,
  upsertWaterController,
} from "../controllers/water.js";
const router = Router();

router.get("/", ctrlWrapper(getWaterController));
router.get("/:waterId", ctrlWrapper(getWaterByIdController));
router.post("/", ctrlWrapper(createWaterController));
router.delete("/:waterId", ctrlWrapper(deleteWaterController));
router.put("/:waterId", ctrlWrapper(upsertWaterController));
export default router;
