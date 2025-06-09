import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DebtPaymentService } from './debt_payment.service';
import { CreateDebtPaymentDto } from './dto/create-debt_payment.dto';
import { UpdateDebtPaymentDto } from './dto/update-debt_payment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Debt Payment')  // Bu controller swaggerda qanday ko‘rinishini belgilaydi
@Controller('debt-payment')
export class DebtPaymentController {
  constructor(private readonly debtPaymentService: DebtPaymentService) {}
//   @Get('remaining-debts')
// async getRemainingDebts() {
//   return this.debtPaymentService.getUserRemainingDebts();
// }
  @Post()
  @ApiOperation({ summary: 'Yangi debt payment yaratish' })
  @ApiResponse({ status: 201, description: 'Debt payment muvaffaqiyatli yaratildi.' })
  @ApiResponse({ status: 400, description: 'Yaroqsiz so‘rov.' })
  create(@Body() createDebtPaymentDto: CreateDebtPaymentDto) {
    return this.debtPaymentService.create(createDebtPaymentDto);
  }


  @Get()
  @ApiOperation({ summary: 'Barcha debt paymentlarni olish' })
  @ApiResponse({ status: 200, description: 'Debt paymentlar ro‘yxati.' })
  findAll() {
    return this.debtPaymentService.findAll();
  }
  @Get(':id')
  @ApiOperation({ summary: 'Id bo‘yicha debt payment olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Debt payment ID' })
  @ApiResponse({ status: 200, description: 'Debt payment topildi.' })
  @ApiResponse({ status: 404, description: 'Debt payment topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.debtPaymentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Debt payment ma’lumotlarini yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Yangilanishi kerak bo‘lgan debt payment ID' })
  @ApiResponse({ status: 200, description: 'Debt payment muvaffaqiyatli yangilandi.' })
  @ApiResponse({ status: 404, description: 'Debt payment topilmadi.' })
  update(@Param('id') id: string, @Body() updateDebtPaymentDto: UpdateDebtPaymentDto) {
    return this.debtPaymentService.update(+id, updateDebtPaymentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Debt payment o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'O‘chirilishi kerak bo‘lgan debt payment ID' })
  @ApiResponse({ status: 200, description: 'Debt payment muvaffaqiyatli o‘chirildi.' })
  @ApiResponse({ status: 404, description: 'Debt payment topilmadi.' })
  remove(@Param('id') id: string) {
    return this.debtPaymentService.remove(+id);
  }
}
