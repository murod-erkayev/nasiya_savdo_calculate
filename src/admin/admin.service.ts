import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { email, password, confrim_password , phone_number, username} = createAdminDto;

    if (password !== confrim_password) {
      throw new BadRequestException('Parollar mos emas');
    }

    const existingAdmin1 = await this.adminRepo.findOne({ where: { email } });
    if (existingAdmin1) {
      throw new BadRequestException('Bunday emailli admin mavjud');
    }
    const existingAdmin = await this.adminRepo.findOne({ where: [{ phone_number }, { username }] });
    if (existingAdmin) {
      if (existingAdmin.phone_number === phone_number) {
        throw new BadRequestException('Bunday telefon raqamli admin mavjud');
      }
      if (existingAdmin.username === username) {
        throw new BadRequestException('Bunday usernamega ega admin mavjud');
      }
    }
    const hashed_password= await bcrypt.hash(password, 7);
    const activation_link = uuidv4();
    const newAdmin = this.adminRepo.create({
      ...createAdminDto,
      hashed_password,
      activation_link,
      is_active:true
    });
    try {
      await this.mailService.sendMailAdmin(newAdmin);
    } catch (error) {
      console.log('Emailga xat yuborishda xatolik yuzaga keldi');
    }

    return this.adminRepo.save(newAdmin);
  }

  findAll() {
    return this.adminRepo.find();
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new BadRequestException({ message: 'Bunday Id malumot yo‘q' });
    }
    return admin;
  }

  findByEmail(email: string) {
    return this.adminRepo.findOne({ where: { email } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new BadRequestException({ message: 'Bunday Id malumotlari mavjud emas' });
    }
    const { password, confrim_password,...res} = updateAdminDto;
      if (password !== confrim_password) {
        throw new BadRequestException('Parollar mos emas');
      }
    const hashed_password = await bcrypt.hash(password!, 7);
    return  this.adminRepo.update(id, {
      ...res,
      hashed_password,
      activation_link: uuidv4(),
    });
  }

  async remove(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) {
      throw new BadRequestException({ message: 'Bunday Id mavjud emas' });
    }
    if( admin.role === 'superadmin') {
      throw new BadRequestException({ message: 'Bunday adminni o‘chirish mumkin emas' });
    }
    await this.adminRepo.delete(id);
    return { message: `Admin #${id} muvaffaqiyatli o‘chirildi` };
  }

  async findByToken(refresh_token: string) {
    if (!refresh_token) {
      throw new NotFoundException({ message: 'Bunday token mavjud emas' });
    }
    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      }) as { id: number };
      const admin = await this.findOne(decoded.id);
      return admin;
    } catch (error) {
      console.log('Invalid or expired refresh token');
      throw new BadRequestException('Token yaroqsiz yoki muddati tugagan');
    }
  }

  async activateAdmin(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link not found');
    }

    const admin = await this.adminRepo.findOne({ where: { activation_link: link } });

    if (!admin) {
      throw new BadRequestException('Activation link is invalid');
    }

    if (admin.is_active) {
      throw new BadRequestException('Admin already activated');
    }

    admin.is_active = true;
    await this.adminRepo.save(admin);

    return {
      message: 'Admin activated successfully',
      is_active: admin.is_active,
    };
  }

  async save(admin: Admin) {
    return this.adminRepo.save(admin);
  }
  async updateRefreshToken(id: number, hashed_refresh_token: string | null): Promise<void> {
    const result = await this.adminRepo.update(id, { hashed_refresh_token });
  
      if (result.affected === 0) {
        throw new NotFoundException(`Admin with ID ${id} not found`);
      }
    }
}
