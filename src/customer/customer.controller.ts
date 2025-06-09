import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get('debts')
  async getCustomerDebts() {
    return await this.customerService.getCustomerDebts();
  }
  @Post()
  @ApiOperation({ summary: 'Yangi mijoz yaratish' })
  @ApiResponse({ status: 201, description: 'Mijoz muvaffaqiyatli yaratildi', type: Customer })
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha mijozlarni olish' })
  @ApiResponse({ status: 200, description: 'Mijozlar ro‘yxati', type: [Customer] })
  findAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Bitta mijoz haqida ma’lumot olish' })
  @ApiParam({ name: 'id', description: 'Mijozning ID raqami' })
  @ApiResponse({ status: 200, description: 'Mijoz topildi', type: Customer })
  @ApiResponse({ status: 404, description: 'Mijoz topilmadi' })
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mijoz ma’lumotlarini yangilash' })
  @ApiParam({ name: 'id', description: 'Yangilanadigan mijoz ID si' })
  @ApiResponse({ status: 200, description: 'Mijoz muvaffaqiyatli yangilandi', type: Customer })
  update(@Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Mijozni o‘chirish' })
  @ApiParam({ name: 'id', description: 'O‘chiradigan mijoz ID si' })
  @ApiResponse({ status: 200, description: 'Mijoz muvaffaqiyatli o‘chirildi' })
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
