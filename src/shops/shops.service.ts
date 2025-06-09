import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from './entities/shop.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepo:Repository<Shop>,
    private readonly usersService:UsersService) {
  }
  async create(createShopDto: CreateShopDto) {
    const {userId} = createShopDto
    const  user  = await this.usersService.findOne(userId)
    if(!user){
      throw new BadRequestException({message:"Bunda User Id Mavjud emas"})
    }
    const shop =  this.shopRepo.create({...createShopDto, user})
    return this.shopRepo.save(shop)

  }

  findAll() {
    return this.shopRepo.find({relations:["user"]})
  }

  findOne(id: number) {
    return this.shopRepo.findOne({where:{id},relations:["user"] })
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const shop = await this.shopRepo.findOne({where:{id},relations:["user"]})
    if(!shop){
      throw new BadRequestException({message:"Bunday Shop Mavjude emas"})
    }
    const { userId, ...rest } = updateShopDto
    if(userId){
      const user= await this.usersService.findOne(userId)
      if(!user){
        throw new BadRequestException({message:"Bunday User Id mavjud emas"})
      }
      shop.user = user
    }
    Object.assign(shop, rest)
    return this.shopRepo.save(shop)
  }

  remove(id: number) {
    return this.shopRepo.delete(id)
  }
}
