import Joi from "joi";
export const createWatersSchema = Joi.object({
  date: Joi.string().required(),
  volume: Joi.number().min(50).required(),
  userId: Joi.string().required(),
});

export const upsertWaterSchema = Joi.object({
  date: Joi.string(),
  volume: Joi.number().min(50),
});
