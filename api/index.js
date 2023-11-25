const api = require('express').Router();
const Glob = require('glob');
const path = require('path');
const { default: CommonError } = require('./library/error');

api.get('/', (req, res) => {
  res.json({
    msg: `Welcome to Integro API`,
  });
});

const apis = Glob.sync('**/*.controller.js', { cwd: './api/' });
apis.map((t) => require(path.resolve(`./api/${t}`))).forEach((subApi) => api.use(subApi));

api.use('/*', (req, res) =>
  CommonError(
    req,
    {
      code: 500,
      toJSON: {
        message: 'Route not found',
      },
    },
    res
  )
);

module.exports = api;
