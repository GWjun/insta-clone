import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UsersModel } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersModel)
    private readonly usersRepository: Repository<UsersModel>,
  ) {}

  async getAllUsers() {
    return this.usersRepository.find();
  }

  async createUser(user: Pick<UsersModel, 'nickname' | 'email' | 'password'>) {
    const nicknameExists = await this.usersRepository.exists({
      where: { nickname: user.nickname },
    });

    if (nicknameExists) {
      throw new BadRequestException('Already exist nickname');
    }

    const emailExists = await this.usersRepository.exists({
      where: { email: user.email },
    });

    if (emailExists) {
      throw new BadRequestException('Already exist nickname');
    }

    const userObj = this.usersRepository.create({
      nickname: user.nickname,
      email: user.email,
      password: user.password,
    });

    const newUser = await this.usersRepository.save(userObj);

    return newUser;
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }
}
