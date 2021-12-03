const Joi = require("joi");

const authSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  userName: Joi.string().alphanum().min(3).max(10).required(),
  email: Joi.string()
    .email()
    .pattern(
      new RegExp(
        "^([a-z0-9.-]{1,64})@([a-z0-9-]{2,200}).([a-z]{2,20})(.[a-z]{2,10})?$"
      )
    )
    .messages({ "string.pattern.base": "invalid email id" })
    .required(),
  mobile: Joi.string()
    .pattern(
      new RegExp(
        "^(\\d{10})|((d{3}[-]){2}d{4})|((d{3}[.]){2}d{4})|((d{3}[ ]){2}d{4})$"
      )
    )
    .messages({ "string.pattern.base": "invalid mobile number" })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$"))
    .required()
    .messages({
      "string.pattern.base":
        "password must have at least one capital letter, small letter and number with minimum 8 characters",
    }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .error(() => new Error("passwords do not match")),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = { authSchema, loginSchema };
