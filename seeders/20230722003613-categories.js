/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkInsert('categories', [
        {
          description: 'Technology',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Travel',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Mobile Device',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Sports',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Food',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          description: 'Healthy Lifestyle',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('categories', null, {});
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
