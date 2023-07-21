/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'post_categories',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          post_id: {
            type: Sequelize.UUID,
            references: {
              model: 'posts',
              key: 'id'
            },
            allowNull: false
          },
          category_id: {
            type: Sequelize.UUID,
            references: {
              model: 'categories',
              key: 'id'
            },
            allowNull: false
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
          },
          deleted_at: {
            allowNull: true,
            type: Sequelize.DATE,
            defaultValue: null
          }
        },
        true,
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('post_categories', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
