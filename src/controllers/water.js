import createHttpError from "http-errors";
import { createWater, getAllWater, getWaterById } from "../services/water.js";

export const getWaterController = async (req, res) => {
  const water = await getAllWater();
  res.status(200).json({
    status: 200,
    message: "All water",
    data: water,
  });
};
export const getWaterByIdController = async (req, res) => {
  const { waterId } = req.params;
  const water = await getWaterById(waterId);
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
  const water = await createWater(req.body);

  res.status(200).json({
    status: 200,
    message: "Successfully created water!",
    data: water,
  });
};
