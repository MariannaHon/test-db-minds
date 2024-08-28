
import Joi from 'joi';

const addWaterErrorMessages = {
    'string.base': 'Field {#label} must be a string.',
    'string.empty': 'Field {#label} cannot be empty.',
    'string.min': 'Field {#label} should have a minimum length of {#limit}.',
    'string.max': 'Field {#label} should have a maximum length of {#limit}.',
    'any.required': 'missing required {#label} field',
};

export const createWaterSchema = Joi.object({
    amount: Joi.string().min(5).max(7).required().messages(addWaterErrorMessages),
    time: Joi.string().min(4).max(8).required().messages(addWaterErrorMessages),
});

export const updateWaterSchema = Joi.object({
    amount: Joi.string().min(5).max(7),
    time: Joi.string().min(4).max(8),
});
