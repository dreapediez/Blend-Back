/* eslint-disable @typescript-eslint/naming-convention */
import { Joi } from "express-validation";

const registerUserSchema = {
  body: Joi.object({
    username: Joi.string().min(5).required().messages({
      "string.empty": `Need a username to can be part of Blendcommunity`,
      "string.min": `Your username should have a minimum length of 5 characters`,
      "any.required": `Username is a required field`,
    }),
    password: Joi.string().min(8).required().messages({
      "string.empty": `Need a password to can be part of Blendcommunity`,
      "string.min": `Your password should have a minimum length of 8 characters`,
      "any.required": `Password is a required field`,
    }),
    email: Joi.string().email().required(),
  }),
};

export default registerUserSchema;
