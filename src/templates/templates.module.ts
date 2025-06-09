import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './entities/template.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    Template
  ]), UsersModule],
  controllers: [TemplatesController],
  providers: [TemplatesService],
  exports:[TemplatesService]
})
export class TemplatesModule {}
