import Joi from "joi";
export const createWatersSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Date must be in the format YYYY-MM-DDTHH:mm",
    }),
  volume: Joi.number().min(50).required(),
  userId: Joi.string().required(),
});

export const upsertWaterSchema = Joi.object({
  date: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
    .messages({
      "string.pattern.base": "Date must be in the format YYYY-MM-DDTHH:mm",
    }),
  volume: Joi.number().min(50),
});
