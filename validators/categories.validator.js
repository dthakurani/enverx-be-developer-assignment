const Joi = require('joi');
const { validateRequest } = require('../utilities/common-functions');

const requestParameterTypes = {
  body: 'body',
  query: 'query',
  params: 'param'
};

const JoiInstance = Joi.defaults(schema => {
  return schema.options({
    errors: {
      wrap: {
        // Remove quotes from variable names in error messages
        label: false
      }
    }
  });
});

const findAllCategory = (req, res, next) => {
  const schema = JoiInstance.object().keys({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
  });
  return validateRequest(req, res, next, schema, requestParameterTypes.query);
};

module.exports = {
  findAllCategory
};
