import createHttpError from "http-errors";
import {
  createWater,
  deleteWater,
  getAllWater,
  getWater,
  getWatersByMonth,
  updateWater,
} from "../services/water.js";

export const getWaterController = async (req, res) => {
  const { _id: userId } = req.user;

  const water = await getAllWater(userId);

  res.status(200).json({
    status: 200,
    message: "All water",
    data: water,
  });
};

export const getWaterByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { waterId } = req.params;

  const water = await getWater({ _id: waterId, userId });
  if (!water) {
    throw createHttpError(404, "Water not found!");
  }

  res.status(200).json({
    satus: 200,
    message: `Successfully found water with id ${waterId}`,
    data: water,
  });
};
export const createWaterController = async (req, res) => {
  const { _id: userId } = req.user;

  const water = await createWater({ ...req.body, userId });

  res.status(200).json({
    status: 200,
    message: "Successfully created water!",
    data: water,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  const { _id: userId } = req.user;
  const water = await deleteWater({ _id: waterId, userId });
  if (!water) {
    next(createHttpError(404, "Water not found!"));
    return;
  }
  res.status(204).send();
};
export const upsertWaterController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { waterId } = req.params;
  const result = await updateWater({ _id: waterId, userId }, req.body, {
    upsert: true,
  });
  if (!result) {
    next(createHttpError(404, "Water not found!"));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: `Successfully upserted a water with id ${waterId}! `,
    data: result,
  });
};
export const patchWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  const { _id: userId } = req.user;
  const water = await updateWater({ _id: waterId, userId }, req.body);
  if (!water) {
    next(createHttpError(404, "Water not found!"));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully patched a water with id ${waterId}`,
    data: water,
  });
};

export const getWatersByMonthController = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { date } = req.params;
  const newDate = toString(date);
  console.log(date);
  console.log(newDate);

  const water = await getWatersByMonth(userId, date);
  res.status(200).json({
    status: 200,
    message: "gOOD",
    data: water,
  });
};
