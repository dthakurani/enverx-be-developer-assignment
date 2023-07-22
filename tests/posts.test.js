const request = require('supertest');
const { describe, beforeAll, afterAll, it, expect } = require('@jest/globals');
const crypto = require('crypto');

const app = require('../app');
const models = require('../models');
const payload = require('../helpers/test-common-functions');
const { findAllUser } = require('../services/users.service');
const { findAllCategory } = require('../services/categories.service');
const { createPost } = require('../services/posts.service');

require('dotenv').config();

describe('create post', () => {
  let users;
  let categories;
  let createPostPayload;
  let withoutTitleCreatePostPayload;
  let withoutContentCreatePostPayload;
  let withoutCategoriesCreatePostPayload;
  let randomCategoriesCreatePostPayload;
  beforeAll(async () => {
    users = await findAllUser({ page: 1, limit: 10 });
    categories = await findAllCategory({ page: 1, limit: 10 });
    createPostPayload = await payload.createRandomPostPayload([categories.categories[0].id, categories.categories[1].id]);
    withoutTitleCreatePostPayload = await payload.createRandomPostPayloadWithoutTitle([categories.categories[0].id, categories.categories[1].id]);
    withoutContentCreatePostPayload = await payload.createRandomPostPayloadWithoutContent([categories.categories[0].id, categories.categories[1].id]);
    withoutCategoriesCreatePostPayload = await payload.createRandomPostPayloadWithoutCategories();
    randomCategoriesCreatePostPayload = await payload.createRandomPostPayload([crypto.randomUUID()]);
  });

  afterAll(async () => {
    await models.PostCategories.destroy({
      where: {},
      force: true
    });
    await models.Post.destroy({
      where: {},
      force: true
    });
  });

  it('post created successfully', async () => {
    const response = await request(app).post('/api/posts').send(createPostPayload).set('Authorization', users.users[0].id);
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('OK');
  });
  it('when user id not provided', async () => {
    const response = await request(app).post('/api/posts').send(createPostPayload);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Access denied');
  });
  it('without title', async () => {
    const response = await request(app).post('/api/posts').send(withoutTitleCreatePostPayload).set('Authorization', users.users[0].id);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('title is required');
  });
  it('without content', async () => {
    const response = await request(app).post('/api/posts').send(withoutContentCreatePostPayload).set('Authorization', users.users[0].id);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('content is required');
  });
  it('without categories', async () => {
    const response = await request(app).post('/api/posts').send(withoutCategoriesCreatePostPayload).set('Authorization', users.users[0].id);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('categories is required');
  });
  it('categories not found', async () => {
    const response = await request(app).post('/api/posts').send(randomCategoriesCreatePostPayload).set('Authorization', users.users[0].id);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('categories not found');
  });
});

describe('get post by id', () => {
  let id;
  beforeAll(async () => {
    const users = await findAllUser({ page: 1, limit: 10 });
    const categories = await findAllCategory({ page: 1, limit: 10 });
    const createPostPayload = await payload.createRandomPostPayload([categories.categories[0].id, categories.categories[1].id]);
    const post = await createPost(createPostPayload, users.users[0]);
    id = post.post.id;
  });

  afterAll(async () => {
    await models.PostCategories.destroy({
      where: {},
      force: true
    });
    await models.Post.destroy({
      where: {},
      force: true
    });
  });

  it('get post successfully', async () => {
    console.log(id);
    const response = await request(app).get(`/api/posts/${id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('OK');
  });
  it('post not found', async () => {
    console.log(id);
    const response = await request(app).get(`/api/posts/${crypto.randomUUID()}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('post not found');
  });
});

describe('delete post by id', () => {
  let id;
  beforeAll(async () => {
    const users = await findAllUser({ page: 1, limit: 10 });
    const categories = await findAllCategory({ page: 1, limit: 10 });
    const createPostPayload = await payload.createRandomPostPayload([categories.categories[0].id, categories.categories[1].id]);
    const post = await createPost(createPostPayload, users.users[0]);
    id = post.post.id;
  });

  afterAll(async () => {
    await models.PostCategories.destroy({
      where: {},
      force: true
    });
    await models.Post.destroy({
      where: {},
      force: true
    });
  });

  it('delete post successfully', async () => {
    const response = await request(app).delete(`/api/posts/${id}`);
    expect(response.statusCode).toBe(204);
  });
  it('post not found', async () => {
    const response = await request(app).delete(`/api/posts/${crypto.randomUUID()}`);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('post not found');
  });
});

describe('get all post', () => {
  beforeAll(async () => {
    const users = await findAllUser({ page: 1, limit: 10 });
    const categories = await findAllCategory({ page: 1, limit: 10 });
    for (let i = 0; i < 4; i += 1) {
      const createPostPayload = await payload.createRandomPostPayload([categories.categories[0].id, categories.categories[1].id]);
      await createPost(createPostPayload, users.users[0]);
    }
  });

  afterAll(async () => {
    await models.PostCategories.destroy({
      where: {},
      force: true
    });
    await models.Post.destroy({
      where: {},
      force: true
    });
  });

  it('get all post successfully', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.statusCode).toBe(200);
  });
});

describe('update post', () => {
  let users;
  let createPostPayload;
  let withoutTitleCreatePostPayload;
  let withoutContentCreatePostPayload;
  let withoutCategoriesCreatePostPayload;
  let randomCategoriesCreatePostPayload;
  let id;
  beforeAll(async () => {
    users = await findAllUser({ page: 1, limit: 10 });
    const categories = await findAllCategory({ page: 1, limit: 10 });
    createPostPayload = await payload.createRandomPostPayload([categories.categories[0].id, categories.categories[1].id]);
    const post = await createPost(createPostPayload, users.users[0]);
    id = post.post.id;
    withoutTitleCreatePostPayload = await payload.createRandomPostPayloadWithoutTitle([categories.categories[0].id, categories.categories[1].id]);
    withoutContentCreatePostPayload = await payload.createRandomPostPayloadWithoutContent([categories.categories[0].id, categories.categories[1].id]);
    withoutCategoriesCreatePostPayload = await payload.createRandomPostPayloadWithoutCategories();
    randomCategoriesCreatePostPayload = await payload.createRandomPostPayload([crypto.randomUUID()]);
  });

  afterAll(async () => {
    await models.PostCategories.destroy({
      where: {},
      force: true
    });
    await models.Post.destroy({
      where: {},
      force: true
    });
  });

  it('post updated successfully', async () => {
    const response = await request(app).put(`/api/posts/${id}`).send(createPostPayload).set('Authorization', users.users[0].id);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('OK');
  });
  it('post not found', async () => {
    const response = await request(app).put(`/api/posts/${crypto.randomUUID()}`).send(createPostPayload).set('Authorization', users.users[0].id);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('post not found');
  });
  it('when user id not provided', async () => {
    const response = await request(app).put(`/api/posts/${id}`).send(createPostPayload);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Access denied');
  });
  it('without title', async () => {
    const response = await request(app).put(`/api/posts/${id}`).send(withoutTitleCreatePostPayload).set('Authorization', users.users[0].id);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('title is required');
  });
  it('without content', async () => {
    const response = await request(app).put(`/api/posts/${id}`).send(withoutContentCreatePostPayload).set('Authorization', users.users[0].id);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('content is required');
  });
  it('without categories', async () => {
    const response = await request(app).put(`/api/posts/${id}`).send(withoutCategoriesCreatePostPayload).set('Authorization', users.users[0].id);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('categories is required');
  });
  it('categories not found', async () => {
    const response = await request(app).put(`/api/posts/${id}`).send(randomCategoriesCreatePostPayload).set('Authorization', users.users[0].id);
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe('categories not found');
  });
});
