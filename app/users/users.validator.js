const { body } = require('express-validator/check');

const smsValidation = [
    body('is_sms_enabled')
    .exists().withMessage('Please specify is_sms_enabled key')
    .not().isEmpty().withMessage('Please specify is_sms_enabled key')
    .isBoolean().withMessage('Non boolean value')
];

module.exports = { smsValidation };
