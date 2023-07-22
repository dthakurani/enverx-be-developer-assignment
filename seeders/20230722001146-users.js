const { faker } = require('@faker-js/faker');
const { hash } = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      const users = [];

      // Generate 4 fake users
      for (let i = 0; i < 5; i += 1) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        const password = await hash(`${firstName}@123`, process.env.SALT_ROUNDS);

        users.push({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
      await queryInterface.bulkInsert('users', users);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.bulkDelete('users', null, {});
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
