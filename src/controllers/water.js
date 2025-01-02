import createHttpError from "http-errors";
import {
  createWater,
  deleteWater,
  getAllWater,
  getWater,
  getWatersByDay,
  getWatersByMonth,
  updateWater,
} from "../services/water.js";
import { calculateWaterPercentage } from "../utils/calculateWaterPercentage.js";
import { userInformation } from "../services/user.js";

export const getWaterController = async (req, res) => {
  const { _id: userId } = req.user;

  const waters = await getAllWater(userId);
  if (!waters) {
    throw createHttpError(404, "Water not found.");
  }
  res.status(200).json({
    status: 200,
    message: "Successfully retrieved all water records",
    data: waters,
  });
};

export const getWaterByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { waterId } = req.params;

  const water = await getWater({ _id: waterId, userId });
  if (!water) {
    throw createHttpError(404, `Water with id ${waterId} not found`);
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

  res.status(201).json({
    status: 201,
    message: "Successfully created water.",
    data: water,
  });
};

export const deleteWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  const { _id: userId } = req.user;
  const water = await deleteWater({ _id: waterId, userId });
  if (!water) {
    next(createHttpError(404, `Water with id ${waterId} not found!`));
    return;
  }
  res.status(204).send();
};

export const patchWaterController = async (req, res, next) => {
  const { waterId } = req.params;
  const { _id: userId } = req.user;
  const water = await updateWater({ _id: waterId, userId }, req.body);
  if (!water) {
    next(createHttpError(404, `Water with id ${waterId} not found`));
    return;
  }
  res.status(200).json({
    status: 200,
    message: `Successfully updated water record with id ${waterId}`,
    data: water,
  });
};

export const getWatersByMonthController = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { date } = req.params;

  console.log(date);

  const water = await getWatersByMonth(userId, date);

  if (!water || water.length === 0) {
    next(createHttpError(404, "No water records found for the given month"));
    return;
  }
  res.status(200).json({
    status: 200,
    message: "Successfully found water for a month.",
    data: water,
  });
};

export const getWatersByDayController = async (req, res, next) => {
  const { _id: userId } = req.user;

  const { date } = req.params;
  const water = await getWatersByDay(userId, date);
  const totalWaterPerDay = water.reduce((acc, item) => acc + item.volume, 0);

  const userInfo = await userInformation(userId);
  const waterDailyNormaOfUser = userInfo.waterDailyNorma;

  const waterPercentage = calculateWaterPercentage(
    waterDailyNormaOfUser,
    totalWaterPerDay
  );

  if (!water || water.length === 0) {
    next(createHttpError(404, "No water records found for the given day."));
    return;
  }
  res.status(200).json({
    status: 200,
    message: "Successfully retrieved water data by day.",
    data: water,
    totalWaterPerDay,
    waterPercentage,
  });
};
