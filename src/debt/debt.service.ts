import { User } from './../users/scheam/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Debt } from './entities/debt.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class DebtService {
  constructor(
    @InjectRepository(Debt) private readonly debtRode:Repository<Debt>,
    private readonly usersService:UsersService,
    private readonly customerService:CustomerService
) {
    
  }
  async create(createDebtDto: CreateDebtDto) {
    const {customerId,userId} = createDebtDto
    const customer = await this.customerService.findOne(customerId) 
    if(!customer){
      throw new BadRequestException({message:"Budnda Customer Id mavjude emas"})
    }
    const user = await this.usersService.findOne(userId)
    if(!user){
      throw new BadRequestException({messgae:"Bunday User Id Mavjuemas"})
    }
    console.log(user);
    console.log(customer);
    const debt = this.debtRode.create({...createDebtDto,user,customer})
    return this.debtRode.save(debt)
  }

  findAll() {
    return this.debtRode.find({relations:["user","customer"]})
  }

  findOne(id: number) {
    return this.debtRode.findOne({where:{id}, relations:["user", "customer"]})
  }

  async update(id: number, updateDebtDto: UpdateDebtDto) {
    const debt = await this.debtRode.findOne({where:{id}, relations:["user", "customer"]})
    if(!debt){
      throw new BadRequestException({message:'Bunday qarz mavjud emas'})
    }
    const {customerId,userId, ...rest} = updateDebtDto
      const customer = await this.customerService.findOne(customerId!) 
      if(!customer){
        throw new BadRequestException({message:"Budnda Customer Id mavjude emas"})
      }
      const user = await this.usersService.findOne(userId!)
      if(!user){
        throw new BadRequestException({messgae:"Bunday User Id Mavjuemas"})
      }
    return this.debtRode.update(id, {
      user:user,
      customer:customer,
      ...rest
    })
  }
  
  remove(id: number) {
    return this.debtRode.delete(id)
  }
}
