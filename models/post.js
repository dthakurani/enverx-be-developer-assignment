const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'author_id',
        targetKey: 'id',
        as: 'users'
      });
      this.belongsToMany(models.Category, {
        through: models.PostCategories,
        foreignKey: 'post_id',
        otherKey: 'category_id',
        as: 'categories'
      });
    }
  }
  Post.init(
    {
      author_id: {
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id'
        },
        allowNull: false
      },
      title: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.TEXT
      },
      published: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      published_at: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: null
      }
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Post',
      tableName: 'posts',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    }
  );
  return Post;
};
