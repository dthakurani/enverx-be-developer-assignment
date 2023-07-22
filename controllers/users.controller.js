const userService = require('../services/users.service');
const { commonErrorHandler } = require('../utilities/error-handler');

const findAllUser = async (req, res, next) => {
  try {
    const payload = req.query;
    const findAllUserResponse = await userService.findAllUser(payload);
    req.statusCode = 200;
    req.data = findAllUserResponse;
    next();
  } catch (error) {
    console.log('findAllUser error:', error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  findAllUser
};
