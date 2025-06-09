import { ShopsService } from './../shops/shops.service';
import { CategoryService } from './../category/category.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/pruduct.entity';
import { UpdatePruductDto } from './dto/update-pruduct.dto';
import { CreatePruductDto } from './dto/create-pruduct.dto';
import { CreatePinCodeDto } from '../pin-code/dto/create-pin-code.dto';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    private readonly  categoryService:CategoryService,
    private readonly  shopsService:ShopsService,
  ) {}
  async create(createProductDto: CreatePruductDto, image: Express.Multer.File) {
    const { shopId, categoryId, ...res } = createProductDto;
  
    const shop = await this.shopsService.findOne(shopId);
    if (!shop) {
      throw new BadRequestException({ message: "Bunday Shop Id Mavjud emas" });
    }
  
    const category = await this.categoryService.findOne(categoryId);
    if (!category) {
      throw new BadRequestException({ message: "Bunday category Id Mavjud emas" });
    }
  
    const imagePath = image ? image.path : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
  
    const product = this.productRepo.create({
      ...res,
      shop: shop,
      category: category,
      image: imagePath,
    });
  
    return this.productRepo.save(product);
  }
  
  
  

  async findAll() {
    return this.productRepo.find({ relations: ['category', 'shop'] });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['category', 'shop'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, updateDto: UpdatePruductDto) {
    const products = await this.productRepo.findOne({where:{id}})
    if(!products){
      throw new BadRequestException({message:'Bunday Product Id Mavjud emas'})
    }
    const {shopId, categoryId, ...res} = updateDto
    const shop =await this.shopsService.findOne(shopId!)
    if(!shop){
      throw new BadRequestException({message:'Bunday Shop Id Mavjud Emas'})
    }
    const category = await this.categoryService.findOne(categoryId!)
    if(!category){
      throw new BadRequestException({message:"Bundya Category Id mavjud emas"})
    }
    return this.productRepo.update(id, {
      shop,
      category,
      ...res
    })
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }
}
