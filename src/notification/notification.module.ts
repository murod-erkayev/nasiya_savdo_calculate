import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { UsersModule } from '../users/users.module';
import { TemplatesModule } from '../templates/templates.module';
import { CustomerModule } from '../customer/customer.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    Notification
  ]), TemplatesModule, CustomerModule],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
