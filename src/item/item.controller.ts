import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateItemDto } from 'src/dto/item/create-item.dto';
import { JwtGuard } from 'src/guard/jwt.guard';
import { ItemService } from './item.service';
import { GetUser } from 'src/decorator/get-user.decorator';

@UseGuards(JwtGuard)
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@GetUser('id') userId: number, @Body() createUserDto: CreateItemDto) {
    return this.itemService.create(userId, createUserDto);
  }
}
