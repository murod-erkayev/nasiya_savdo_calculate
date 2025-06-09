import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PinCodeService } from './pin-code.service';
import { CreatePinCodeDto } from './dto/create-pin-code.dto';
import { UpdatePinCodeDto } from './dto/update-pin-code.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('pin-code')
@Controller('pin-code')
export class PinCodeController {
  constructor(private readonly pinCodeService: PinCodeService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new pin code' })
  @ApiBody({ type: CreatePinCodeDto })
  @ApiResponse({ status: 201, description: 'Pin code successfully created.' })
  create(@Body() createPinCodeDto: CreatePinCodeDto) {
    return this.pinCodeService.create(createPinCodeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all pin codes' })
  @ApiResponse({ status: 200, description: 'List of pin codes returned.' })
  findAll() {
    return this.pinCodeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a pin code by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Pin code ID' })
  @ApiResponse({ status: 200, description: 'Pin code returned.' })
  @ApiResponse({ status: 404, description: 'Pin code not found.' })
  findOne(@Param('id') id: string) {
    return this.pinCodeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a pin code by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Pin code ID' })
  @ApiBody({ type: UpdatePinCodeDto })
  @ApiResponse({ status: 200, description: 'Pin code successfully updated.' })
  @ApiResponse({ status: 404, description: 'Pin code not found.' })
  update(@Param('id') id: string, @Body() updatePinCodeDto: UpdatePinCodeDto) {
    return this.pinCodeService.update(+id, updatePinCodeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a pin code by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Pin code ID' })
  @ApiResponse({ status: 200, description: 'Pin code successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Pin code not found.' })
  remove(@Param('id') id: string) {
    return this.pinCodeService.remove(+id);
  }
}
