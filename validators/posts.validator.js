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

const createUpdatePost = (req, res, next) => {
  const schema = JoiInstance.object().keys({
    title: Joi.string().required(),
    content: Joi.string().required(),
    published: Joi.boolean().default('false'),
    categories: Joi.array().items(Joi.string().uuid().required())
  });
  return validateRequest(req, res, next, schema, requestParameterTypes.body);
};

const findAllPosts = (req, res, next) => {
  const schema = JoiInstance.object().keys({
    sort: Joi.array().items(Joi.string().valid('created_at', 'title')),
    categories: Joi.array().items(Joi.string().uuid()),
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10)
  });
  return validateRequest(req, res, next, schema, requestParameterTypes.query);
};

module.exports = {
  createUpdatePost,
  findAllPosts
};
