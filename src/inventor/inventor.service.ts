import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventor } from './entities/inventor.entity';
import { CreateInventorDto } from './dto/create-inventor.dto';
import { UpdateInventorDto } from './dto/update-inventor.dto';
import { ProductService } from './../pruducts/pruducts.service';
import { ShopsService } from './../shops/shops.service';

@Injectable()
export class InventorService {
  constructor(
    @InjectRepository(Inventor)
    private readonly inventorRepo: Repository<Inventor>,
    private readonly productService: ProductService,
    private readonly shopsService: ShopsService,
  ) {}

  async create(createInventorDto: CreateInventorDto) {
    const { productId, shopId, ...rest } = createInventorDto;

    const product = await this.productService.findOne(productId);
    if (!product) {
      throw new BadRequestException({ message: 'Bunday Product Id mavjud emas' });
    }

    const shop = await this.shopsService.findOne(shopId);
    if (!shop) {
      throw new BadRequestException({ message: 'Bunday Shop Id mavjud emas' });
    }

    const newInventor = this.inventorRepo.create({
      ...rest,
      product,
      shop,
    });

    return this.inventorRepo.save(newInventor);
  }

  async findAll(): Promise<Inventor[]> {
    return this.inventorRepo.find({
      relations: ['product', 'shop'], // bog‘langan malumotlarni olish uchun
    });
  }

  async findOne(id: number): Promise<Inventor> {
    const inventor = await this.inventorRepo.findOne({
      where: { id },
      relations: ['product', 'shop'],
    });

    if (!inventor) {
      throw new NotFoundException({ message: 'Bunday Inventor topilmadi' });
    }

    return inventor;
  }

  async update(id: number, updateInventorDto: UpdateInventorDto): Promise<Inventor> {
    const inventor = await this.findOne(id); // mavjudligini tekshirib olamiz
    
    const { productId, shopId, ...rest } = updateInventorDto;

    if (productId) {
      const product = await this.productService.findOne(productId);
      if (!product) {
        throw new BadRequestException({ message: 'Bunday Product Id mavjud emas' });
      }
      inventor.product = product;
    }

    if (shopId) {
      const shop = await this.shopsService.findOne(shopId);
      if (!shop) {
        throw new BadRequestException({ message: 'Bunday Shop Id mavjud emas' });
      }
      inventor.shop = shop;
    }

    Object.assign(inventor, rest); // qolgan maydonlarni yangilash

    return this.inventorRepo.save(inventor);
  }

  async remove(id: number): Promise<{ message: string }> {
    const inventor = await this.findOne(id);
    await this.inventorRepo.remove(inventor);
    return { message: 'Inventor muvaffaqiyatli o‘chirildi' };
  }
}
