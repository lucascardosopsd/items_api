import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignupDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: SignupDto) {
    const exists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (exists)
      throw new HttpException('User aready exists', HttpStatus.CONFLICT);

    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        firsName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        passwordHash: hash,
      },
    });

    delete user.passwordHash;

    return user;
  }

  signin() {
    return '';
  }
}
