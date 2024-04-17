import { login } from '../auth.service';

describe('login', () => {
  it('should return true on successfull login', async () => {
    const body = { email: 'slimaniamin76@gmail.com', password: 'Amine.123' };
    const res = await login(body);
    expect(res).toBe(true);
  });

  it('should throw error message on failed login', async () => {
    expect.assertions(1);
    try {
      const body = { email: 'test@gmail.com', password: 'Test.123' };
      await login(body);
    } catch (err) {
      expect(err).toMatch('Invalid email');
    }
  });
});
