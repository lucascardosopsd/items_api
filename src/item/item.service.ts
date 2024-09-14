import { Injectable } from '@nestjs/common';
import { CreateItemDto } from 'src/dto/item/create-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: number, createItemDto: CreateItemDto) {
    return this.prisma.item.create({
      data: {
        ...createItemDto,
        userId,
      },
    });
  }
}
