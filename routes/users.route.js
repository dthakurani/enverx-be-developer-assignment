const { Router } = require('express');

const { genericResponse } = require('../utilities/response-handler');
const userValidator = require('../validators/users.validator');
const userController = require('../controllers/users.controller');
const userSerializer = require('../serializers/users.serializer');

const router = Router();

router.get('/', userValidator.findAllUser, userController.findAllUser, userSerializer.findAllUser, genericResponse);

module.exports = router;
