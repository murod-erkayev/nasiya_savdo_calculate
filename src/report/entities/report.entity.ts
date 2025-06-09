import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Shop } from '../../shops/entities/shop.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum ReportType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

@Entity()
export class Reports {
  @ApiProperty({ example: 1, description: 'Report unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => Shop, description: 'Related shop entity' })
  @ManyToOne(() => Shop, (shop) => shop.reports)
  shop: Shop;

  @ApiProperty({ enum: ReportType, description: 'Type of the report' })
  @Column({
    type: 'enum',
    enum: ReportType,
  })
  report_type: ReportType;

  @ApiProperty({ example: 'Some report data string', description: 'Report data content' })
  @Column()
  data: string;
}
