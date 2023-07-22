const categoryService = require('../services/categories.service');
const { commonErrorHandler } = require('../utilities/error-handler');

const findAllCategory = async (req, res, next) => {
  try {
    const payload = req.query;
    const findAllCategoryResponse = await categoryService.findAllCategory(payload);
    req.statusCode = 200;
    req.data = findAllCategoryResponse;
    next();
  } catch (error) {
    console.log('findAllCategory error:', error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  findAllCategory
};
