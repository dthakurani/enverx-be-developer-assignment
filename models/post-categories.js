const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Post, {
        foreignKey: 'post_id',
        targetKey: 'id',
        as: 'posts'
      });
      this.belongsTo(models.Category, {
        foreignKey: 'category_id',
        targetKey: 'id',
        as: 'categories'
      });
    }
  }
  PostCategories.init(
    {
      post_id: {
        type: DataTypes.UUID,
        references: {
          model: 'posts',
          key: 'id'
        },
        allowNull: false
      },
      category_id: {
        type: DataTypes.UUID,
        references: {
          model: 'categories',
          key: 'id'
        },
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'PostCategories',
      tableName: 'post_categories',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    }
  );
  return PostCategories;
};
