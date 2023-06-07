const baseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})

const Joi = baseJoi.extend(extension);

module.exports.parkSchema = Joi.object({
    park: Joi.object({
        title: Joi.string().required().escapeHTML(),
        price: Joi.number().min(0).optional(),
        // images: Joi.required(),
        location: Joi.string().required().escapeHTML(),
        description: Joi.string().escapeHTML()
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(0).required(),
        body: Joi.string().required().escapeHTML()
    }).required()
});