import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateItemDto } from 'src/dto/item/create-item.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { ItemService } from './item.service';
import { GetUser } from 'src/decorator/get-user.decorator';

@UseGuards(JwtGuard)
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get(':id')
  get(@GetUser('id') userId: number, @Param('id') id: number) {
    return this.itemService.get(userId, +id);
  }

  @Post()
  create(@GetUser('id') userId: number, @Body() createUserDto: CreateItemDto) {
    return this.itemService.create(userId, createUserDto);
  }
}
