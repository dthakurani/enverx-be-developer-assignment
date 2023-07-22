const model = require('../models');

const findAll = async payload => {
  const { page, limit } = payload;
  const skip = (page - 1) * limit;

  const categories = await model.Category.findAll({ limit, offset: skip });
  const total = await model.Category.count();
  return { categories, total, page, limit };
};

module.exports = {
  findAll
};
