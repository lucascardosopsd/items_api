import { Injectable } from '@nestjs/common';
import { CreateItemDto } from 'src/dto/item/create-item.dto';
import { UpdateItemDto } from 'src/dto/item/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  get(userId: number, id: number) {
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

  update(id: number, updateItemDto: UpdateItemDto) {
    return this.prisma.item.update({
      where: { id },
      data: updateItemDto,
    });
  }
}
