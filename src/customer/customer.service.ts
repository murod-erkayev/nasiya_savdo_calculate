import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private readonly customerRepo:Repository<Customer>,
  @InjectDataSource() private dataSource: DataSource) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const {phone_number, card} = createCustomerDto
    const phone_number_card = await this.customerRepo.findOne({where:{phone_number, card}})
    if(phone_number_card){
      throw new BadRequestException({massage:'Bunday phone_number mavjud yoki card'})
    }
    return this.customerRepo.save(createCustomerDto)
    }
  findAll() {
    return this.customerRepo.find()
  }
  findOne(id: number) {
    return this.customerRepo.findOne({where:{id}})
  }
  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepo.update(id, updateCustomerDto)
  }
  async remove(id: number) {
    const customer = await this.customerRepo.findOne({where:{id}})
    if(!customer){
      throw new BadRequestException({message:"Bunday Id Malumot Yoq"})
    }
    return this.customerRepo.delete(id)
  }
  // customer.service.ts

    async getCustomerDebts() {
      const query = `
  SELECT 
    customer.id AS customer_id,
    customer.first_name AS customer_name,
    COALESCE(SUM(debt.amoun), 0) AS total_debt,
    COALESCE(SUM(debt_payment.amount), 0) AS total_paid,
    COALESCE(SUM(debt.amoun), 0) - COALESCE(SUM(debt_payment.amount), 0) AS remaining_debt
  FROM customer
  LEFT JOIN debt ON customer.id = debt."customerId"
  LEFT JOIN debt_payment ON debt_payment."debtId" = debt.id
  GROUP BY customer.id, customer.first_name
  ORDER BY remaining_debt DESC;
      `;
      return await this.dataSource.query(query);
    }
}
