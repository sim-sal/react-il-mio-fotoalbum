const Joi = require('joi');

const photoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(10).required(),
    image: Joi.string(),
    visible: Joi.boolean(),
    categories: Joi.array().items(Joi.number()),
});

const categorySchema = Joi.object({
    name: Joi.string().required(),
});

const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
        .required()
        .messages({
            'string.pattern.base': 'La password deve contenere almeno una lettera maiuscola, una lettera minuscola e un numero.',
            'string.min': 'La password deve essere lunga almeno {#limit} caratteri.',
        }),
    photos: Joi.array().items(Joi.number()),
});

const messageSchema = Joi.object({
    content: Joi.string().min(5).required(),
    email: Joi.string().email().required()
});

module.exports = { photoSchema, categorySchema, userSchema, messageSchema };