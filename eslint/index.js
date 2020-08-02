'use strict';

const wrap = require('./wrap');

const getWrapRule = (a) => ({
    [a]: wrap(require(`./${a}`)),
});

module.exports.rules = {
    ...getWrapRule('wrap-destructured-object-params'),
};

module.exports.configs = {
    recommended: {
        rules: {
            'react-stocks/wrap-destructured-object-params': 'error',
        },
    },
};
