/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { SignInRequestDto } from './dto/signIn.dto';
import { SignUpRequestDto } from './dto/signUp.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userData: SignInRequestDto): Promise<any> {
    const user = await this.usersService.findByEmail(userData.email);
    if (!user || !(await compare(userData.password, user.password))) {
      throw new UnauthorizedException();
    }
    const updateUser = await this.usersService.update(user.id, {
      isLogin: true,
    });
    const { password, ...result } = updateUser.dataValues;

    const payload = { sub: user.id, username: user.name };
    console.log('user', updateUser);
    return {
      user: { ...result },
      token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(userData: SignUpRequestDto): Promise<any> {
    const existingUser = await this.usersService.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }
    const hashedPassword = await hash(userData.password, 10);
    const newUser = await this.usersService.create({
      name: userData.name,
      password: hashedPassword,
      email: userData.email,
      isLogin: true,
    });

    const { password, ...result } = newUser.dataValues;
    const payload = { sub: newUser.id, username: newUser.name };
    console.log('user', newUser);
    return {
      user: { ...result },
      token: await this.jwtService.signAsync(payload),
    };
  }
  async signOut(id: string): Promise<any> {
    return this.usersService.update(id, { isLogin: false });
  }
}
