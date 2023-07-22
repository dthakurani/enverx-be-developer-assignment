const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Post, {
        through: models.PostCategories,
        foreignKey: 'category_id',
        otherKey: 'post_id',
        as: 'posts'
      });
    }
  }
  Category.init(
    {
      description: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Category',
      tableName: 'categories',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    }
  );
  return Category;
};
