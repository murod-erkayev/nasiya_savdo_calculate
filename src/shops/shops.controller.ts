import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Shop } from './entities/shop.entity';

@ApiTags('shops')
@Controller('shops')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new shop' })
  @ApiBody({ type: CreateShopDto })
  @ApiResponse({ status: 201, description: 'The shop has been successfully created.', type: Shop })
  create(@Body() createShopDto: CreateShopDto) {
    return this.shopsService.create(createShopDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all shops' })
  @ApiResponse({ status: 200, description: 'Return all shops.', type: [Shop] })
  findAll() {
    return this.shopsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a shop by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Shop ID' })
  @ApiResponse({ status: 200, description: 'Return a shop.', type: Shop })
  findOne(@Param('id') id: string) {
    return this.shopsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a shop by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Shop ID' })
  @ApiBody({ type: UpdateShopDto })
  @ApiResponse({ status: 200, description: 'The shop has been successfully updated.', type: Shop })
  update(@Param('id') id: string, @Body() updateShopDto: UpdateShopDto) {
    return this.shopsService.update(+id, updateShopDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a shop by id' })
  @ApiParam({ name: 'id', type: Number, description: 'Shop ID' })
  @ApiResponse({ status: 200, description: 'The shop has been successfully deleted.' })
  remove(@Param('id') id: string) {
    return this.shopsService.remove(+id);
  }
}
