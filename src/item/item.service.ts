import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateItemDto } from 'src/dto/item/create-item.dto';
import { UpdateItemDto } from 'src/dto/item/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: number, id: number) {
    const exists = await this.prisma.item.findUnique({ where: { id } });

    if (!exists) {
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.item.findUnique({
      where: { id, userId },
    });
  }

  create(userId: number, createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: {
        ...createItemDto,
        userId,
      },
    });
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const exists = await this.prisma.item.findUnique({ where: { id } });

    if (!exists) {
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }

  async delete(id: number) {
    const exists = await this.prisma.item.findUnique({ where: { id } });

    if (!exists) {
      throw new HttpException('Id not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.item.delete({ where: { id } });
  }
}
