import request from 'supertest';
import mongoose from 'mongoose';

import usersController from '../src/app/controllers/user.controller';

describe('GET /api/users', () => {
  it('should return 200 OK', () => {
    return request(usersController).get('/api/users').expect(200);
  });
});