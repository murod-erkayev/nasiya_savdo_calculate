import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PinCode } from './entities/pin-code.entity';
import { CreatePinCodeDto } from './dto/create-pin-code.dto';
import { UpdatePinCodeDto } from './dto/update-pin-code.dto';
import { UsersService } from '../users/users.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

@Injectable()
export class PinCodeService {
  constructor(
    @InjectRepository(PinCode)
    private readonly pinCodeRepo: Repository<PinCode>,
    private readonly usersService: UsersService,
  ) {}

  async create(createPinCodeDto: CreatePinCodeDto): Promise<PinCode> {
    const { userId, ...rest } = createPinCodeDto;

    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new BadRequestException({ message: 'Bunday user ID mavjud emas' });
    }

    const existing = await this.pinCodeRepo.findOne({ where: { user: { id: userId } } });
    if (existing) {
      throw new BadRequestException({
        message: 'Bu foydalanuvchida allaqachon PIN mavjud',
      });
    }

    const pinCode = this.pinCodeRepo.create({
      ...rest,
      user,
    });

    return await this.pinCodeRepo.save(pinCode);
  }

  async findAll(): Promise<PinCode[]> {
    return await this.pinCodeRepo.find({
      relations: ['user']
    });
  }

  async findOne(id: number): Promise<PinCode> {
    const pin = await this.pinCodeRepo.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!pin) {
      throw new NotFoundException(`PinCode ID ${id} topilmadi`);
    }

    return pin;
  }

  async update(
    id: number,
    updatePinCodeDto: UpdatePinCodeDto,
  ) {
    const pin = await this.findOne(id); 
    if(!pin){
      throw new BadRequestException({message:"Bunday Id Da malumot yoqligi uchun update qila olamaysiz"})
    }
    const {userId, ...res} = updatePinCodeDto
      const user = await this.usersService.findOne(userId!);
      if (!user) {
        throw new BadRequestException({ message: 'Bunday user ID mavjud emas' });
      }
       return this.pinCodeRepo.update(id, {
        user, ...res
      })
  }
  
  async remove(id: number): Promise<{ message: string }> {
    const pin = await this.findOne(id);
    await this.pinCodeRepo.remove(pin);
    return { message: `PinCode ID ${id} muvaffaqiyatli o‘chirildi` };
  }
}
