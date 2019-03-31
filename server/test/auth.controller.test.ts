import request from 'supertest';

import { App } from '../src/app/app';

describe('AuthController', () => {
  const testUser = {
    email: 'user@test.com',
    password: 'ABCdef123456'
  };

  it('should sign in', async done => {
    await request(new App().express).post('/api/auth/signin').send(testUser).expect(200);
    done();
  });
});
