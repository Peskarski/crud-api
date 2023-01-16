import { validate as validateUuid } from 'uuid';
import { constants as httpConstants } from 'node:http2';
import {
  afterAll,
  describe, expect, it,
} from '@jest/globals';
import supertest from 'supertest';
import Application from '../shared/application';
import userRouter from '../components/users/router';

const testApp = new Application(userRouter);
testApp.createServer();
const serverTest = supertest(testApp.getServer());

afterAll(() => {
  testApp.stopServer();
});

describe('POST /api/users', () => {
  it('creates a new user', async () => {
    const userData = {
      username: 'Vadzim',
      age: 27,
      hobbies: ['music', 'sport'],
    };

    const response = await serverTest.post('/api/users').send(userData);
    const result = response.body;

    expect(response.status).toBe(httpConstants.HTTP_STATUS_CREATED);
    expect(validateUuid(result.id)).toBeTruthy();
    expect(result.username).toEqual(userData.username);
    expect(result.age).toEqual(userData.age);
    expect(result.hobbies).toEqual(userData.hobbies);
  });

  describe('GET /api/users', () => {
    it('returns an array with a created user', async () => {
      const response = await serverTest.get('/api/users');
      const result = response.body;

      expect(result).toHaveLength(1);
    });
  });

  describe('DELETE /api/users', () => {
    it('returns an array with a created user', async () => {
      const response = await serverTest.get('/api/users');
      const result = response.body;

      const { id } = result[0];

      await serverTest.delete(`/api/users/${id}`);
      const afterDeleteResponse = await serverTest.get('/api/users');
      const afterDeleteUsers = afterDeleteResponse.body;

      expect(afterDeleteUsers).toHaveLength(0);
    });
  });
});
