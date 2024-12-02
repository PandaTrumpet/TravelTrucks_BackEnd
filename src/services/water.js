import { WatersCollection } from "../db/models/water.js";
export const getAllWater = async () => {
  const water = await WatersCollection.find();
  console.log(water);

  return water;
};
export const getWaterById = async (waterId) => {
  const water = await WatersCollection.findById(waterId);
  return water;
};
export const createWater = async (payload) => {
  const water = await WatersCollection.create(payload);
  return water;
};
