import { User } from './../users/scheam/user.entity';
import { ShopsService } from './../shops/shops.service';
import { UsersService } from './../users/users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private readonly walletRepo:Repository<Wallet>,
    private readonly usersService:UsersService,
    private readonly shopsService:ShopsService) {}
  async create(createWalletDto: CreateWalletDto) {
    const {userId, shopId} = createWalletDto
    const user = await this.usersService.findOne(userId)
    if(!user){
      throw new BadRequestException({message:"Bunday User Id Mavjud emas"})
    } 
    const shop = await this.shopsService.findOne(shopId)
    if(!shop){
      throw new BadRequestException({message:"Bunday Shop Id mavjud emas"})
    }
    const wallet = await this.walletRepo.create({...createWalletDto, shop, user})
    return this.walletRepo.save(wallet)
  }

  findAll() {
    return this.walletRepo.find({relations:["user" , "shop"]})
  }
  findOne(id: number) {
    return this.walletRepo.findOne({where:{id}, relations:["user", "shop"]})
  }

  async update(id: number, updateWalletDto: UpdateWalletDto) {
    const wallet = await this.walletRepo.findOne({where:{id}})
    if(!wallet){
      throw new BadRequestException({message:"Bunday Id Malumot Mavjud emas"})
    }
    const {userId, shopId, ...res} = updateWalletDto
    const user = await this.usersService.findOne(userId!)
    if(!user){
      throw new BadRequestException({message:"Bunday User Id mavjud emas"})
    }
    const shop = await this.shopsService.findOne(shopId!)
    if(!shop){
      throw new BadRequestException({message:"Bunday Shop Idagi malumot mavjud emas"})
    }
    return this.walletRepo.update(id,{
      user,
      shop,
      ...res
    })
  }

  remove(id: number) {
    return this.walletRepo.delete(id)
  }
}
