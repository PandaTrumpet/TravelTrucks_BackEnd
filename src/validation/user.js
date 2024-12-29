import Joi from "joi";
export const upsertUsersSchema = Joi.object({
  name: Joi.string().min(2).max(15),
  weight: Joi.number().min(15).max(200),
  activeTime: Joi.number().min(0.2).max(8),
  avatar: Joi.string(),
  waterDailyNorma: Joi.number().min(0.5).max(5),
  gender: Joi.string().valid("male", "female"),
});
