const {
    validationResult
} = require('express-validator/check');

/**
 * API to respond to simple request
 * @returns JSON
 * @author Thomson P
 */

 const sampleLogger = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).error(errors.mapped());
    }

    try {
        return res.status(200).message('SUCCESS').return({});
    }
    catch (err) {
        return res.status(500).message('FAILED').error(true);
    }
};

module.exports = { sampleLogger };
