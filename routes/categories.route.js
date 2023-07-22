const { Router } = require('express');

const { genericResponse } = require('../utilities/response-handler');
const CategoryValidator = require('../validators/categories.validator');
const CategoryController = require('../controllers/categories.controller');
const CategorySerializer = require('../serializers/categories.serializer');

const router = Router();

router.get('/', CategoryValidator.findAllCategory, CategoryController.findAllCategory, CategorySerializer.findAllCategory, genericResponse);

module.exports = router;
