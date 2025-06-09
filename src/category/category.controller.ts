import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi kategoriya yaratish' })
  @ApiResponse({ status: 201, description: 'Kategoriya muvaffaqiyatli yaratildi.', type: Category })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha kategoriyalarni olish' })
  @ApiResponse({ status: 200, description: 'Kategoriyalar ro‘yxati', type: [Category] })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta kategoriya haqida ma’lumot olish' })
  @ApiParam({ name: 'id', description: 'Kategoriya ID raqami' })
  @ApiResponse({ status: 200, description: 'Kategoriya topildi', type: Category })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi' })
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Kategoriya ma’lumotlarini yangilash' })
  @ApiParam({ name: 'id', description: 'Yangilanadigan kategoriya ID si' })
  @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli yangilandi', type: Category })
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Kategoriya o‘chirish' })
  @ApiParam({ name: 'id', description: 'O‘chiradigan kategoriya ID si' })
  @ApiResponse({ status: 200, description: 'Kategoriya muvaffaqiyatli o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
