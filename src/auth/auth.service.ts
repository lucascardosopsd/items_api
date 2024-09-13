import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SigninDto, SignupDto } from 'src/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {
    super();
  }

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
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        passwordHash: hash,
      },
    });

    return this.signToken(user.id, user.email);
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new HttpException("User dosen't exists", HttpStatus.NOT_FOUND);
    }

    const passCheck = await argon.verify(user.passwordHash, dto.password);

    if (!passCheck) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: this.config.get('SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
