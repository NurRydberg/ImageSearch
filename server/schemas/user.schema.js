const Joi = require('joi')

const userSchema = Joi.object({
    user: Joi.string()
})