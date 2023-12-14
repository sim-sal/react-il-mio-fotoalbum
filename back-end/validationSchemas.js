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

module.exports = { photoSchema, categorySchema };