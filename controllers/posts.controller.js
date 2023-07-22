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

const getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const getPostByIdResponse = await postService.getPostById(postId);
    req.statusCode = 200;
    req.data = getPostByIdResponse;
    next();
  } catch (error) {
    console.log('getPostById error:', error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const deletePostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    await postService.deletePostById(postId);
    req.statusCode = 204;
    next();
  } catch (error) {
    console.log('deletePostById error:', error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

const findAllPosts = async (req, res, next) => {
  try {
    const payload = req.query;
    const findAllPostsResponse = await postService.findAllPosts(payload);
    req.statusCode = 200;
    req.data = findAllPostsResponse;
    next();
  } catch (error) {
    console.log('findAllPosts error:', error);
    const statusCode = error.statusCode || 500;
    commonErrorHandler(req, res, error.message, statusCode, error);
  }
};

module.exports = {
  createPost,
  getPostById,
  deletePostById,
  findAllPosts
};
