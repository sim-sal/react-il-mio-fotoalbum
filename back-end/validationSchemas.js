const Joi = require('joi');

const photoSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
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
    password: Joi.string().required(),
    photos: Joi.array().items(Joi.number()),
});

const messageSchema = Joi.object({
    content: Joi.string().required(),
    email: Joi.string().email().required()
});

module.exports = { photoSchema, categorySchema, userSchema, messageSchema };