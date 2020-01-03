
const router = require('express').Router();
const { sampleLogger } = require('./logger.service');

const routes = () => {

    router.route('/')
        .get(sampleLogger)
        .post(sampleLogger)
        .put(sampleLogger);

    return router;
};

module.exports = { routes, path: 'logger' };