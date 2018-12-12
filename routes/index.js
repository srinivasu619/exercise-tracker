const {
    Router
} = require('express');


const route = Router();
route.use('/exercise', require('./exercise'));

module.exports = route;