import { User } from './../users/scheam/user.entity';
import { DebtService } from './../debt/debt.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDebtPaymentDto } from './dto/create-debt_payment.dto';
import { UpdateDebtPaymentDto } from './dto/update-debt_payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DebtPayment } from './entities/debt_payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DebtPaymentService {
  constructor(
    @InjectRepository(DebtPayment) private readonly debtPaymentRepo: Repository<DebtPayment>,
    private readonly debtService: DebtService,
  ) {}

  async create(createDebtPaymentDto: CreateDebtPaymentDto) {
    const { debtId, ...res } = createDebtPaymentDto;
    const debt = await this.debtService.findOne(debtId);

    if (!debt) {
      throw new BadRequestException({ message: "Bunday Debt Id mavjud emas" });
    }

    const debtPayment = this.debtPaymentRepo.create({
      debt,
      ...res,
    });
    return this.debtPaymentRepo.save(debtPayment);
  }

  async findAll() {
    // Barcha debtPayment larni debt bilan birga olish
    return this.debtPaymentRepo.find({ relations: ['debt', "debt.user", "debt.customer"] });
  }

  // async getUserRemainingDebts() {
  //   const debt = await this.debtService.findAll()
  //   console.log(debt);
  //   return debt.map((item) => {
  //     const totalPaid = item.debt_payment.reduce((sum, payment) => sum + payment.amount, 0);
  //     const remainingDebt = item.total_amount - totalPaid;
  //     return {
  //       ...item,
  //       remainingDebt: remainingDebt > 0 ? remainingDebt : 0,
  //     };
  //   })
  // }
  
  
  async findOne(id: number) {
    const debtPayment = await this.debtPaymentRepo.findOne({
      where: { id },
      relations: ['debt',"debt.user", "debt.customer"],
    });

    if (!debtPayment) {
      throw new NotFoundException(`DebtPayment id: ${id} topilmadi`);
    }
    return debtPayment;
  }

  async update(id: number, updateDebtPaymentDto: UpdateDebtPaymentDto) {
    const debtPayment = await this.debtPaymentRepo.findOne({ where: { id } });
    if (!debtPayment) {
      throw new BadRequestException({ message: "Bunday Id Mavjud emas" });
    }
    const { debtId, ...res } = updateDebtPaymentDto;
    const debt = await this.debtService.findOne(debtId!);
    if (!debt) {
      throw new BadRequestException({ message: "Bunday Debt Id mavjud emas" });
    }
    return this.debtPaymentRepo.update(id, {
      debt,
      ...res,
    });
  }

  async remove(id: number) {
    const debtPayment = await this.findOne(id);

    return this.debtPaymentRepo.remove(debtPayment);
  }
}
