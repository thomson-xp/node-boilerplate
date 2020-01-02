const {
    users: Users,
    Sequelize
} = require('../../models');

const { Op } = Sequelize;

const {
    validationResult
} = require('express-validator/check');

/**
 * API to update the SMS preference of the user (especially patient)
 * @returns JSON
 * @author Thomson P
 */
const smsSettings = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).error(errors.mapped());
    }

    try {
    }
    catch (err) {
        return res.status(500).message('SMS_SETTING_FAILED').error(true);
    }
};


/**
 * API to Get the SMS preference of the user (especially patient)
 * @returns  JSON
 * @author Binil baby
 */
const getSmsSettings = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).error(errors.mapped());
    }

    try {
        return res.status(200).message('Success').return({})
    }
    catch (err) {
        return res.status(500).message('SMS_SETTING_FAILED').error(true);
    }
};

module.exports = { smsSettings, getSmsSettings };
