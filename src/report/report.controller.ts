import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('Reports')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new report' })
  @ApiBody({ type: CreateReportDto })
  @ApiResponse({ status: 201, description: 'Report successfully created.' })
  create(@Body() createReportDto: CreateReportDto) {
    return this.reportService.create(createReportDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all reports' })
  @ApiResponse({ status: 200, description: 'List of all reports.' })
  findAll() {
    return this.reportService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get report by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Report ID' })
  @ApiResponse({ status: 200, description: 'Report found.' })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  findOne(@Param('id') id: string) {
    return this.reportService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a report by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Report ID' })
  @ApiBody({ type: UpdateReportDto })
  @ApiResponse({ status: 200, description: 'Report successfully updated.' })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  update(@Param('id') id: string, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(+id, updateReportDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a report by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Report ID' })
  @ApiResponse({ status: 200, description: 'Report successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Report not found.' })
  remove(@Param('id') id: string) {
    return this.reportService.remove(+id);
  }
}
