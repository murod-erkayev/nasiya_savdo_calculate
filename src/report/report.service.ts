import { ShopsService } from './../shops/shops.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reports } from './entities/report.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Reports) private readonly reportRepo: Repository<Reports>,
    private readonly shopsService: ShopsService,
  ) {}

  async create(createReportDto: CreateReportDto) {
    const { shopId } = createReportDto;
    const shop = await this.shopsService.findOne(shopId);
    if (!shop) {
      throw new BadRequestException({ message: "Bunday Id Mavjud emas" });
    }
    const report = this.reportRepo.create({
      shop,
      ...createReportDto,
    });
    return this.reportRepo.save(report);
  }

  async findAll() {
    // Barcha reportlarni, ularning tegishli shoplari bilan birga olish
    return this.reportRepo.find({ relations: ['shop','shop.user'] });
  }

  async findOne(id: number) {
    // id bo'yicha reportni topish, agar topilmasa NotFoundException otkazish
    const report = await this.reportRepo.findOne({ where: { id }, relations: ['shop','shop.user'] });
    if (!report) {
      throw new NotFoundException({ message: "Bunday Iddagi report topilmadi" });
    }
    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto) {
    const report = await this.reportRepo.findOne({where:{id}})
    if(!report){
      throw new BadRequestException({message:"Bunday Id Mavjud emas"})
    }
    const {shopId, ...res} = updateReportDto
    const shop = await this.shopsService.findOne(shopId!)
    if(!shop){
      throw new BadRequestException({message:"Bunday Id Mavjud emas"})
    }
    return this.reportRepo.update(id, {
      shop, 
      ...res
    }) 
  }

  async remove(id: number) {
    const report = await this.reportRepo.findOne({ where: { id } });
    if (!report) {
      throw new NotFoundException({ message: "Bunday Iddagi report topilmadi" });
    }
    await this.reportRepo.delete(id);
    return { message: `Report #${id} muvaffaqiyatli o'chirildi` };
  }
}
