const model = require('../models');

const findAll = async payload => {
  const { page, limit } = payload;
  const skip = (page - 1) * limit;

  const users = await model.User.findAll({ limit, offset: skip });
  const total = await model.User.count();
  return { users, total, page, limit };
};

module.exports = {
  findAll
};
