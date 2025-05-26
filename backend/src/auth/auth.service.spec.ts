import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let users: Partial<Record<keyof UsersService, jest.Mock>>;
  let jwt: Partial<Record<keyof JwtService, jest.Mock>>;

  beforeEach(async () => {
    users = {
      findOneByEmail: jest.fn(),
      create: jest.fn(),
    };

    jwt = {
      sign: jest.fn().mockReturnValue('token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: users },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  // validateUser
  it('validateUser returns user without password', async () => {
    const password = await bcrypt.hash('pw', 10);
    const user = { id: 1, email: 'a@b.com', password };
    (users.findOneByEmail as jest.Mock).mockResolvedValue(user);

    const result = await service.validateUser('a@b.com', 'pw');

    expect(result).toEqual({ id: 1, email: 'a@b.com' });
  });

  // signup
  it('signup issues token', async () => {
    const mockUser = { id: 2, email: 'x', password: 'h' };
    (users.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await service.signup('x', 'h');

    expect(result).toEqual({ access_token: 'token' });
    expect(jwt.sign).toHaveBeenCalledWith({ email: 'x', sub: 2 });
  });

  // login
  it('login returns an access_token object', async () => {
    const user = { id: 3, email: 'y@z.com' };
    const result = await service.login(user);

    expect(result).toEqual({ access_token: 'token' });
  });

  it('login calls jwt.sign() with correct payload', async () => {
    const user = { id: 5, email: 'a@b.com' };
    await service.login(user);

    expect(jwt.sign).toHaveBeenCalledWith({ email: 'a@b.com', sub: 5 });
  });
});
