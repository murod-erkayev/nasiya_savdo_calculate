import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventorService } from './inventor.service';
import { CreateInventorDto } from './dto/create-inventor.dto';
import { UpdateInventorDto } from './dto/update-inventor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Inventor')  // Swagger dokumentatsiyada "Inventor" bo'limi
@Controller('inventor')
export class InventorController {
  constructor(private readonly inventorService: InventorService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi inventor yozuvini yaratish' })
  @ApiResponse({ status: 201, description: 'Yaratildi' })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri so‘rov' })
  create(@Body() createInventorDto: CreateInventorDto) {
    return this.inventorService.create(createInventorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha inventor yozuvlarini olish' })
  @ApiResponse({ status: 200, description: 'Inventorlar ro‘yxati' })
  findAll() {
    return this.inventorService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha inventor yozuvini olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Inventor ID' })
  @ApiResponse({ status: 200, description: 'Topildi' })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  findOne(@Param('id') id: string) {
    return this.inventorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Inventor yozuvini yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Yangilanadigan inventor ID' })
  @ApiResponse({ status: 200, description: 'Yangilandi' })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  update(@Param('id') id: string, @Body() updateInventorDto: UpdateInventorDto) {
    return this.inventorService.update(+id, updateInventorDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Inventor yozuvini o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'O‘chiriladigan inventor ID' })
  @ApiResponse({ status: 200, description: 'O‘chirildi' })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  remove(@Param('id') id: string) {
    return this.inventorService.remove(+id);
  }
}
