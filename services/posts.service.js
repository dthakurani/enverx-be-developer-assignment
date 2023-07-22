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

const findAllPosts = async payload => {
  const { page, limit } = payload;
  const skip = (page - 1) * limit;
  const { sort, categories } = payload;

  const whereQuery = {};
  const order = sort?.includes('title')
    ? [
        ['title', 'ASC'],
        ['created_at', 'DESC']
      ]
    : [
        ['created_at', 'DESC'],
        ['title', 'ASC']
      ];
  if (categories) {
    whereQuery.id = {
      [Op.in]: categories
    };
  }

  const posts = await model.Post.findAll({
    include: [
      {
        model: model.Category,
        as: 'categories',
        where: whereQuery
      },
      {
        model: model.User,
        as: 'users'
      }
    ],
    order,
    limit,
    offset: skip
  });

  const total = await model.Post.count({
    include: [
      {
        model: model.Category,
        as: 'categories',
        where: whereQuery
      }
    ]
  });
  return { posts, total, page, limit };
};

const updatePost = async (postId, payload, user) => {
  const transaction = await sequelize.transaction();
  try {
    const { categories, title, content, published } = payload;
    const userPostAlreadyExists = await model.Post.findOne({
      where: {
        author_id: user.id,
        id: postId
      }
    });
    if (!userPostAlreadyExists) {
      throw new CustomException('post not found', 404);
    }

    const postCategories = await model.PostCategories.findAll({
      where: {
        post_id: postId
      },
      include: ['categories']
    });
    const categoryIdsInDB = postCategories.map(pc => pc.category_id);
    const categoryIdsNotInDB = categories.filter(categoryId => !categoryIdsInDB.includes(categoryId));
    const categoryIdsToDelete = categoryIdsInDB.filter(categoryId => !categories.includes(categoryId));
    if (categoryIdsToDelete.length > 0) {
      await model.PostCategories.destroy(
        {
          where: {
            post_id: postId,
            category_id: {
              [Op.in]: categoryIdsToDelete
            }
          }
        },
        { transaction }
      );
    }

    if (categoryIdsNotInDB.length > 0) {
      const newCategories = categoryIdsNotInDB.map(categoryId => ({
        post_id: postId,
        category_id: categoryId
      }));

      await model.PostCategories.bulkCreate(newCategories, { transaction });
    }

    await model.Post.update(
      { author_id: user.id, title, content, published, published_at: published ? new Date() : null },
      { where: { id: postId } },
      { transaction }
    );

    const post = await model.Post.findOne({
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
    await transaction.commit();
    return post;
  } catch (error) {
    await transaction.rollback();
    console.log('updatePost service: ', error);
    await transaction.rollback();
    const statusCode = error.statusCode || 500;
    throw new CustomException(error.message, statusCode);
  }
};

module.exports = {
  getPostById,
  createPost,
  deletePostById,
  findAllPosts,
  updatePost
};
