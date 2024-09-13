import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async update(id: number, updateUserDto: UpdateUserDto) {
    const exists = await this.prisma.user.findUnique({ where: { id } });

    if (!exists) {
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async delete(id: number) {
    const exists = await this.prisma.user.findUnique({ where: { id } });

    if (!exists) {
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.user.delete({
      where: { id },
    });
  }
}
