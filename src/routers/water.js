import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  createWaterController,
  deleteWaterController,
  getWaterByIdController,
  getWaterController,
  upsertWaterController,
  patchWaterController,
  getWatersByMonthController,
  getWatersByDayController,
} from "../controllers/water.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { createWatersSchema, upsertWaterSchema } from "../validation/water.js";
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
router.put(
  "/:waterId",
  isValidId,
  validateBody(upsertWaterSchema),
  ctrlWrapper(upsertWaterController)
);
router.patch(
  "/:waterId",

  isValidId,
  validateBody(upsertWaterSchema),
  ctrlWrapper(patchWaterController)
);
router.get("/day/:date", ctrlWrapper(getWatersByDayController));
router.get("/month/:date", ctrlWrapper(getWatersByMonthController));
export default router;
