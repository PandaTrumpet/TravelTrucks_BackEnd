import Joi from "joi";
export const createWatersSchema = Joi.object({
  date: Joi.string().min(3).max(30),
  volume: Joi.number().min(1).max(50).required(),
  userId: Joi.string(),
});
