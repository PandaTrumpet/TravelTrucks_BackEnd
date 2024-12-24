import Joi from "joi";
export const upsertUsersSchema = Joi.object({
  name: Joi.string().min(2).max(15),
  weight: Joi.number().min(15).max(300),
  time: Joi.date(),
  avatar: Joi.string(),
  waterRate: Joi.number(),
  gender: Joi.string().valid("male", "female"),
});
