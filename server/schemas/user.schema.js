const Joi = require("joi");

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    image: Joi.string().required(),
});

module.exports = { registerSchema };