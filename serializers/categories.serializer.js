const findAllCategory = async (req, res, next) => {
  const receivedData = req.data || {};
  let resultData;
  if (receivedData) {
    const categories = [];
    receivedData.categories.forEach(category => {
      categories.push({
        id: category.id,
        description: category.description,
        created_at: category.created_at
      });
    });
    resultData = { total: receivedData.total, page: receivedData.page, limit: receivedData.limit, categories };
  }
  req.data = resultData;
  next();
};

module.exports = {
  findAllCategory
};
