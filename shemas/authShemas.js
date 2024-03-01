const Joi = require("joi");

const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const registerSchema = (data) =>
  Joi.object({
    email: Joi.string()
      .email()
      .required()
      .pattern(emailReg)
      .messages({ "any.required": "Missing required email field" }),
    password: Joi.string()
      .required()
      .min(4)
      .max(64)
      .message({ "any.required": "Missing required password field" }),
  }).validate(data);

const loginSchema = (data) =>
  Joi.object({
    email: Joi.string()
      .email()
      .pattern(emailReg)
      .required()
      .messages({ "any.required": "Missing required email field" }),
    password: Joi.string()
      .required()
      .min(8)
      .max(64)
      .message({ "any.required": "Missing required password field" }),
  }).validate(data);

const emailSchema = (data) =>
  Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({ "any.required": "Missing required email field" }),
  }).validate(data);

const resetPassword = (data) =>
  Joi.object({
    password: Joi.string().min(8).max(64).required(),
    id: Joi.string().required(),
  }).validate(data);

module.exports = { registerSchema, loginSchema, emailSchema, resetPassword };
