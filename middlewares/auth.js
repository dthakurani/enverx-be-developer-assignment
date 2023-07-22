const models = require('../models');
const { CustomException } = require('../utilities/error-handler');

const authenticateUser = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const userId = header ? header : null;
    if (!userId) {
      CustomException('Access denied', 401);
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
    CustomException(error.message, 500);
  }
};

module.exports = {
  authenticateUser
};
