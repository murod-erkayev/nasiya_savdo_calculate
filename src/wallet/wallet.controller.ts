import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { Wallet } from './entities/wallet.entity';

@ApiTags('wallet')
@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new wallet' })
  @ApiBody({ type: CreateWalletDto })
  @ApiResponse({ status: 201, description: 'Wallet successfully created.', type: Wallet })
  create(@Body() createWalletDto: CreateWalletDto) {
    return this.walletService.create(createWalletDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all wallets' })
  @ApiResponse({ status: 200, description: 'List of wallets', type: [Wallet] })
  findAll() {
    return this.walletService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get wallet by ID' })
  @ApiParam({ name: 'id', description: 'Wallet ID', type: Number })
  @ApiResponse({ status: 200, description: 'Wallet found', type: Wallet })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  findOne(@Param('id') id: string) {
    return this.walletService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update wallet by ID' })
  @ApiParam({ name: 'id', description: 'Wallet ID', type: Number })
  @ApiBody({ type: UpdateWalletDto })
  @ApiResponse({ status: 200, description: 'Wallet successfully updated', type: Wallet })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete wallet by ID' })
  @ApiParam({ name: 'id', description: 'Wallet ID', type: Number })
  @ApiResponse({ status: 200, description: 'Wallet successfully deleted' })
  @ApiResponse({ status: 404, description: 'Wallet not found' })
  remove(@Param('id') id: string) {
    return this.walletService.remove(+id);
  }
}
