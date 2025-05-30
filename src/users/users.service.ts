import { ImageService } from './../image/image.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './scheam/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { NotFoundError } from 'rxjs';
import { ref } from 'process';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly imageService:ImageService,
    private readonly jwtService: JwtService,
    private readonly mailService:MailService

  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, password, confrim_password , imageId} = createUserDto;
    const images = await this.imageService.findOne(imageId)
    if(!images){
      throw new BadRequestException({message:"Bunday Id Malumot Yoq"})
    }
    console.log(images);
    if (password !== confrim_password) {
      console.log(password);
      console.log(confrim_password);
      throw new BadRequestException("Parollar mos emas");
    }
    const existingAdmin = await this.userRepo.findOne({ where: { email } });
    if (existingAdmin) {
      throw new BadRequestException("Bunday emailli foydalanuvchi mavjud");
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newUser = this.userRepo.create({ ...createUserDto, hashed_password:hashed_password,image:images});
    try {
      this.mailService.sendMailUser(newUser)
    } catch (error) {
      console.log("Emailga Hat Yuborishda Hatolik Yuzaga Keldi");
    }
    return await this.userRepo.save(newUser);
  }
  findAll() {
    return this.userRepo.find({relations:["image"]});
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } ,relations:["image"]});
    if(!user){
      throw new BadRequestException({message:"Bunday Id Malumot Yoq "})
    }
    return user
  }
  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }
  async update(id: number, updateUserDto: UpdateUserDto) {
    if(updateUserDto.imageId){
      const images = await this.imageService.findOne(updateUserDto.imageId)
      if(!images){
        throw new BadRequestException({message:'Bunday Image Id Mavjud emas'})
      }
    }
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
    return this.userRepo.delete(id);
  }
  async findByToken(refreshToken:string){
    if(refreshToken){
      throw new NotFoundException({massage:"Bunday token mavjud emas"})
    }
    try {
      const decoded = this.jwtService.verify(refreshToken, {
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
}
