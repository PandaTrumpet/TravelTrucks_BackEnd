import { WatersCollection } from "../db/models/water.js";
export const getAllWater = async (userId) => {
  const water = await WatersCollection.find({ userId });
  // console.log(water);

  return water;
};
export const getWater = async (filter) => {
  const water = await WatersCollection.findOne(filter)``;

  return water;
};
export const createWater = async (payload) => {
  const water = await WatersCollection.create(payload);
  return water;
};
export const deleteWater = async (waterId) => {
  const water = await WatersCollection.findOneAndDelete({ _id: waterId });
  return water;
};
export const updateWater = async (waterId, payload, options = {}) => {
  const rawResult = await WatersCollection.findOneAndUpdate(
    { _id: waterId },
    payload,
    { new: true, includeResultMetadata: true, ...options }
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    water: rawResult.value,
    isNew: rawResult?.lastErrorObject?.upserted,
  };
};

export const getWatersByMonth = async (userId, date) => {
  const water = await WatersCollection.find({ userId, date });

  // console.log(water[0].date);

  return water;
};
