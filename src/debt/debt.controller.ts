import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DebtService } from './debt.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Debt } from './entities/debt.entity';

@ApiTags('Debt')  // Bu controller swaggerda "Debt" bo'limi sifatida ko'rinadi
@Controller('debt')
export class DebtController {
  constructor(private readonly debtService: DebtService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi qarz qo\'shish' })
  @ApiBody({ type: CreateDebtDto })
  @ApiResponse({ status: 201, description: 'Qarz muvaffaqiyatli yaratildi', type: Debt })
  create(@Body() createDebtDto: CreateDebtDto) {
    return this.debtService.create(createDebtDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha qarzlarni olish' })
  @ApiResponse({ status: 200, description: 'Qarzlar ro\'yxati', type: [Debt] })
  findAll() {
    return this.debtService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo\'yicha qarzni olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Qarz ID' })
  @ApiResponse({ status: 200, description: 'Topilgan qarz', type: Debt })
  findOne(@Param('id') id: string) {
    return this.debtService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo\'yicha qarzni yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Qarz ID' })
  @ApiBody({ type: UpdateDebtDto })
  @ApiResponse({ status: 200, description: 'Yangilangan qarz', type: Debt })
  update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    return this.debtService.update(+id, updateDebtDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo\'yicha qarzni o\'chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Qarz ID' })
  @ApiResponse({ status: 200, description: 'Qarz o\'chirildi' })
  remove(@Param('id') id: string) {
    return this.debtService.remove(+id);
  }
}
