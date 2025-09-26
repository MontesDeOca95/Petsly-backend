import Joi from "joi";
import { JUpdateUserType } from "../nomenclators/user-types.joi";
import { JUpdateUserStatus } from "../nomenclators/user-statuses.joi";

export const JUser = Joi.object({
  _id: Joi.string(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dni: Joi.string().required(),
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  userType: JUpdateUserType,
  status: JUpdateUserStatus,
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
})
  .options({ abortEarly: false })
  .allow(null);

export const JUpdateUser = Joi.object({
  _id: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  dni: Joi.string(),
  username: Joi.string(),
  password: Joi.string(),
  email: Joi.string().email(),
  userType: JUpdateUserType,
  status: JUpdateUserStatus,
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
})
  .options({ abortEarly: false })
  .allow(null);
