import { SessionCollection } from "../db/models/Session.js";
import { UserCollection } from "../db/models/User.js";
import { WatersCollection } from "../db/models/Water.js";
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
