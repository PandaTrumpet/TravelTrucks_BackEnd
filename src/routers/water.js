import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  createWaterController,
  deleteWaterController,
  getWaterByIdController,
  getWaterController,
  upsertWaterController,
  patchWaterController,
} from "../controllers/water.js";
import { isValidId } from "../middlewares/isValidId.js";
const router = Router();

router.get("/", ctrlWrapper(getWaterController));
router.get("/:waterId", isValidId, ctrlWrapper(getWaterByIdController));
router.post("/", ctrlWrapper(createWaterController));
router.delete("/:waterId", isValidId, ctrlWrapper(deleteWaterController));
router.put("/:waterId", isValidId, ctrlWrapper(upsertWaterController));
router.patch("/:waterId", isValidId, ctrlWrapper(patchWaterController));
export default router;
