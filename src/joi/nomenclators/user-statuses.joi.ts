import Joi from 'joi';

export const JUserStatus = Joi.object({
  _id: Joi.string(),
  name: Joi.string().required(),
  code: Joi.string().required(),
	createdAt: Joi.date(),
	updatedAt: Joi.date()
})
  .options({ abortEarly: false })
  .allow(null);

export const JUpdateUserStatus = Joi.object({
  _id: Joi.string(),
  name: Joi.string(),
  code: Joi.string(),
	createdAt: Joi.date(),
	updatedAt: Joi.date()
})
  .options({ abortEarly: false })
  .allow(null);