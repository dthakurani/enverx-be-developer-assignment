/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'posts',
        {
          id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },
          author_id: {
            type: Sequelize.UUID,
            references: {
              model: 'users',
              key: 'id'
            },
            allowNull: false
          },
          title: {
            type: Sequelize.STRING
          },
          content: {
            type: Sequelize.TEXT
          },
          published: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          published_at: {
            allowNull: true,
            type: Sequelize.DATE,
            defaultValue: null
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
      await queryInterface.dropTable('posts', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
