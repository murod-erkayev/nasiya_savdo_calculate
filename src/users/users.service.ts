import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './scheam/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { Express } from 'express';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService:MailService

  ) {}
  async create(createUserDto: CreateUserDto, image: Express.Multer.File) {
    const { email, password, confrim_password , phone_number} = createUserDto;
    if (password !== confrim_password) {
      console.log(password);
      console.log(confrim_password);
      throw new BadRequestException("Parollar mos emas");
    }
    // const existingAdmin = await this.userRepo.findOne({ where: { email } });
    // if (existingAdmin) {
    //   throw new BadRequestException("Bunday emailli foydalanuvchi mavjud");
    // }
    const existingAdmin = await this.userRepo.findOne({ where: [{ phone_number }] });
    if (existingAdmin) {
      throw new BadRequestException("Bunday telefon raqamli foydalanuvchi mavjud");
    }
    const password_hashed = await bcrypt.hash(password, 7);
    console.log("Parol:", password); // Murod1972!
    console.log("Hash:", password_hashed);
    const activation_link = uuidv4();
    const imagePath = image ? image.path : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

// Alohida o‘rnatib chiqamiz:
const newUser = this.userRepo.create({
  first_name: createUserDto.first_name,
  last_name: createUserDto.last_name,
  email: createUserDto.email,
  phone_number: createUserDto.phone_number,
  hashed_password:password_hashed,
  activation_link,
  image: imagePath,
  is_active:true
});
    console.log("User Servisdagi User=>",newUser);
    try {
      this.mailService.sendMailUser(newUser)
    } catch (error) {
      console.log("Emailga Hat Yuborishda Hatolik Yuzaga Keldi");
    }
    const a =  await this.userRepo.save(newUser);
    console.log("Bazaga saqlangan foydalanuvchi:", a.hashed_password);
    return a
  }
  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id }});
    if(!user){
      throw new BadRequestException({message:"Bunday Id Malumot Yoq "})
    }
    return user
  }
  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({where:{id}})
    if(!user){
      throw new BadRequestException({message:"Bunday Id Malumotlari mavjud emas"})
    }
    if (updateUserDto.password) {
      if (updateUserDto.password !== updateUserDto.confrim_password) {
        throw new BadRequestException("Parollar mos emas");
      }
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        7
      );
      delete updateUserDto.confrim_password;
    }
    return this.userRepo.update(id, updateUserDto);  
  }
  remove(id: number) {
    const user = this.userRepo.findOne({where:{id}})
    if(!user){
      throw new BadRequestException({message:"Bunday Id Malumotlari mavjud emas"})
    }

    return this.userRepo.delete(id);
  }
  async findByToken(refresh_token:string){
    if(!refresh_token){
      throw new NotFoundException({massage:"Bunday token mavjud emas"})
    }
    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret:process.env.REFRESH_TOKEN_KEY
      }) as {id:number}
      const admin = await this.findOne(decoded.id)
      console.log("User.Servisdagi Admin=>Id",admin);
      return admin
    } catch (error) {
      console.log("Invalid or Expired refresh Token");
    }
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
  
    const user = await this.userRepo.findOne({ where: { activation_link: link } });
  
    if (!user) {
      throw new BadRequestException("Activation link is invalid");
    }
  
    if (user.is_active) {
      throw new BadRequestException("User already activated");
    }
  
    user.is_active = true;
    await this.userRepo.save(user);
  
    return {
      message: "User Activated Successfully",
      is_active: user.is_active,
    };
  }
  
  async save(user:User) {
    return this.userRepo.save(user);
  }
  
  async updateRefreshToken(id: number, hashed_refresh_token: string | null): Promise<void> {
    const result = await this.userRepo.update(id, { hashed_refresh_token });
      if (result.affected === 0) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
    }
}
