const models = require('../models');
const { CustomException, commonErrorHandler } = require('../utilities/error-handler');

const authenticateUser = async (req, res, next) => {
  try {
    const header = req.headers?.authorization;
    const userId = header ? header : null;
    if (!userId) {
      throw new CustomException('Access denied', 401);
    }
    const user = await models.User.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      CustomException('user not found', 404);
    }
    req.user = user;
    next();
  } catch (error) {
    console.log('authenticateUser error:', error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  authenticateUser
};
