import { Module } from '@nestjs/common';
import { PinCodeService } from './pin-code.service';
import { PinCodeController } from './pin-code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinCode } from './entities/pin-code.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([
    PinCode
  ]), UsersModule],
  controllers: [PinCodeController],
  providers: [PinCodeService],
})
export class PinCodeModule {}
