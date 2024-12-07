import Joi from "joi";
export const registerUsersSchema = Joi.object({
  name: Joi.string().min(2).max(15).required(),
  weight: Joi.number().min(15).max(300),
  time: Joi.date(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).max(15).required(),
  avatar: Joi.string(),
  waterRate: Joi.number(),
  gender: Joi.string().valid("male", "female"),
});

export const loginUsersSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const upsertUsersSchema = Joi.object({
  name: Joi.string().min(2).max(15),
  weight: Joi.number().min(15).max(300),
  time: Joi.date(),

  avatar: Joi.string(),
  waterRate: Joi.number(),
  gender: Joi.string().valid("male", "female"),
});
