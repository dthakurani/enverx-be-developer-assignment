const createPost = async (req, res, next) => {
  const receivedData = req.data || {};
  let resultData;
  if (receivedData) {
    resultData = {
      id: receivedData.post.id,
      title: receivedData.post.title,
      content: receivedData.post.content,
      categories: receivedData.categoriesFound?.map(category => ({ id: category.id, description: category.description })) || [],
      published: receivedData.post.published,
      published_at: receivedData.post.published_at,
      created_at: receivedData.post.created_at
    };
  }
  req.data = resultData;
  next();
};

module.exports = {
  createPost
};
