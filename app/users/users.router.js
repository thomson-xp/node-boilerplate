
const router = require('express').Router();
const { smsSettings ,getSmsSettings } = require('./users.service');
const { smsValidation } = require('./users.validator');

const routes = () => {

    router.route('/')
        .get(getSmsSettings);

    // router.route('/:user_id/messageSettings')
    //     .get(getSmsSettings);

    return router;
};

module.exports = { routes, path: 'users' };