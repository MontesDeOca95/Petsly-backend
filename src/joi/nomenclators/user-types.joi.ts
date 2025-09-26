import Joi from 'joi';

export const JUserType = Joi.object({
  _id: Joi.string(),
	name: Joi.string().required(),
	code: Joi.string().required(),
	createdAt: Joi.date(),
	updatedAt: Joi.date()
})
	.options({ abortEarly: false })
	.allow(null);

export const JUpdateUserType = Joi.object({
	_id: Joi.string(),
	name: Joi.string(),
	code: Joi.string(),
	createdAt: Joi.date(),
	updatedAt: Joi.date()
})
	.options({ abortEarly: false })
	.allow(null);