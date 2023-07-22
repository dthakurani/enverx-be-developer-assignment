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

const getPostById = async (req, res, next) => {
  const receivedData = req.data || {};
  let resultData;
  if (receivedData) {
    resultData = {
      id: receivedData.id,
      title: receivedData.title,
      content: receivedData.content,
      categories: receivedData.categories?.map(category => ({ id: category.id, description: category.description })) || [],
      published: receivedData.published,
      published_at: receivedData.published_at,
      created_at: receivedData.created_at,
      updated_at: receivedData.updated_at
    };
  }
  req.data = resultData;
  next();
};

const findAllPosts = async (req, res, next) => {
  const receivedData = req.data || {};
  let resultData;
  if (receivedData) {
    const posts = [];
    receivedData.posts.forEach(post => {
      console.log(post.users.id);
      posts.push({
        id: post.id,
        title: post.title,
        content: post.content,
        user: {
          id: post.users.id,
          name: `${post.users.first_name} ${post.users.last_name}`,
          email: post.users.email
        },
        categories: post.categories?.map(category => ({ id: category.id, description: category.description })) || [],
        published: post.published,
        published_at: post.published_at,
        created_at: post.created_at,
        updated_at: post.updated_at
      });
    });
    resultData = { total: receivedData.total, page: receivedData.page, limit: receivedData.limit, posts };
  }
  req.data = resultData;
  next();
};

module.exports = {
  createPost,
  getPostById,
  findAllPosts
};
