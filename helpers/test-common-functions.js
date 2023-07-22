const { faker } = require('@faker-js/faker');

async function createRandomPostPayload(categories) {
  const postPayload = {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    published: Math.random() >= 0.5,
    categories
  };
  return postPayload;
}

async function createRandomPostPayloadWithoutTitle(categories) {
  const postPayload = {
    content: faker.lorem.paragraphs(),
    published: Math.random() >= 0.5,
    categories
  };
  return postPayload;
}

async function createRandomPostPayloadWithoutContent(categories) {
  const postPayload = {
    title: faker.lorem.word(),
    published: Math.random() >= 0.5,
    categories
  };
  return postPayload;
}

async function createRandomPostPayloadWithoutCategories() {
  const postPayload = {
    title: faker.lorem.word(),
    content: faker.lorem.paragraphs(),
    published: Math.random() >= 0.5
  };
  return postPayload;
}

module.exports = {
  createRandomPostPayload,
  createRandomPostPayloadWithoutTitle,
  createRandomPostPayloadWithoutContent,
  createRandomPostPayloadWithoutCategories
};
