import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ReportType } from "../entities/report.entity";
import { ApiProperty } from '@nestjs/swagger';

export class CreateReportDto {
  @ApiProperty({ example: 1, description: 'Shop ID' })
  @IsNumber()
  shopId: number;

  @ApiProperty({ enum: ReportType, description: 'Type of the report' })
  @IsEnum(ReportType)
  report_type: ReportType;

  @ApiProperty({ example: 'Report data content', description: 'Report data string' })
  @IsString()
  @IsNotEmpty()
  data: string;
}
