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
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { createWatersSchema } from "../validation/water.js";
import { authenticate } from "../middlewares/authenticate.js";
const router = Router();
router.use(authenticate);
router.get("/", ctrlWrapper(getWaterController));
router.get("/:waterId", isValidId, ctrlWrapper(getWaterByIdController));
router.post(
  "/",
  validateBody(createWatersSchema),
  ctrlWrapper(createWaterController)
);
router.delete("/:waterId", isValidId, ctrlWrapper(deleteWaterController));
router.put("/:waterId", isValidId, ctrlWrapper(upsertWaterController));
router.patch("/:waterId", isValidId, ctrlWrapper(patchWaterController));
router.get("/day");
router.get("/month");
export default router;
