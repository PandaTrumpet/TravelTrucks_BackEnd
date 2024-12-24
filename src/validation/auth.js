import Joi from "joi";
import { emailRegexp } from "../constans/user-constans.js";
export const registerUsersSchema = Joi.object({
  name: Joi.string().min(2).max(15).required(),
  weight: Joi.number().min(15).max(300),
  time: Joi.date(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(3).required(),
  // нужно добавить регулярное выражение для пароля
  avatar: Joi.string(),
  waterRate: Joi.number(),
  gender: Joi.string().valid("male", "female"),
});

export const loginUsersSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
