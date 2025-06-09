import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reports } from './entities/report.entity';
import { ShopsModule } from '../shops/shops.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    Reports
  ]), ShopsModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
