const { Router } = require('express');

const { genericResponse } = require('../utilities/response-handler');
const { authenticateUser } = require('../middlewares/auth');
const postValidator = require('../validators/posts.validator');
const postController = require('../controllers/posts.controller');
const postSerializer = require('../serializers/posts.serializer');

const router = Router();

router.post('/', authenticateUser, postValidator.createPost, postController.createPost, postSerializer.createPost, genericResponse);
router.get('/:id', postController.getPostById, postSerializer.getPostById, genericResponse);
router.delete('/:id', postController.deletePostById, genericResponse);
router.get('/', postValidator.findAllPosts, postController.findAllPosts, postSerializer.findAllPosts, genericResponse);

module.exports = router;
