const postService = require('../services/posts.service');
const { commonErrorHandler } = require('../utilities/error-handler');

const createPost = async (req, res, next) => {
  try {
    const payload = req.body;
    const { user } = req;
    const postCreateResponse = await postService.createPost(payload, user);
    req.statusCode = 201;
    req.data = postCreateResponse;
    next();
  } catch (error) {
    console.log('createPost error:', error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  createPost
};
