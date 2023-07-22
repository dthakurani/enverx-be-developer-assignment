const { Op } = require('sequelize');

const model = require('../models');
const { CustomException } = require('../utilities/error-handler');
const { sequelize } = require('../models');

const createPost = async (payload, user) => {
  const transaction = await sequelize.transaction();
  try {
    const { title, content, categories, published } = payload;
    const userPostAlreadyExists = await model.Post.findOne({
      where: {
        author_id: user.id,
        title
      }
    });
    if (userPostAlreadyExists) {
      throw new CustomException('your post with this  title already exist', 400);
    }

    const categoriesFound = await model.Category.findAll({
      where: {
        id: {
          [Op.in]: categories
        }
      }
    });
    const categoryIdsFound = categoriesFound.map(category => category.id);
    const categoryIdsNotFound = categories.filter(id => !categoryIdsFound.includes(id));
    if (categoryIdsNotFound.length > 0) {
      throw new CustomException('categories not found', 400);
    }

    const createPostPayload = {
      author_id: user.id,
      title,
      content,
      published,
      published_at: published ? new Date() : null
    };

    const post = await model.Post.create(createPostPayload, { transaction });
    const postCategoryMapping = categories.map(category => ({ post_id: post.dataValues.id, category_id: category }));

    await model.PostCategories.bulkCreate(postCategoryMapping, { transaction });

    await transaction.commit();
    return { post, categoriesFound };
  } catch (error) {
    console.log('createPost service: ', error);
    await transaction.rollback();
    const statusCode = error.statusCode || 500;
    throw new CustomException(error.message, statusCode);
  }
};

const getPostById = async postId => {
  const postAlreadyExists = await model.Post.findOne({
    where: {
      id: postId
    },
    include: [
      {
        model: model.Category,
        as: 'categories'
      }
    ]
  });
  if (!postAlreadyExists) {
    throw new CustomException('post not found', 404);
  }
  return postAlreadyExists;
};

const deletePostById = async postId => {
  const postAlreadyExists = await model.Post.findOne({
    where: {
      id: postId
    }
  });
  if (!postAlreadyExists) {
    throw new CustomException('post not found', 404);
  }

  await model.Post.destroy({
    where: {
      id: postId
    }
  });
};

module.exports = {
  getPostById,
  createPost,
  deletePostById
};
