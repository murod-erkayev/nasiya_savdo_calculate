import { ProductService } from './../pruducts/pruducts.service';
import { Product } from './../pruducts/entities/pruduct.entity';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateCategoryDto) {
    return this.categoryRepo.save(dto);
  }
  
  async findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category topilmadi');
    return category;
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.findOne(id);
  
    if (dto.name !== undefined) {
      category.name = dto.name;
    }
  
    if (dto.description !== undefined) {
      category.description = dto.description;
    }
  
    return this.categoryRepo.save(category);
  }
  

  async remove(id: number) {
    const category = await this.findOne(id);
    return this.categoryRepo.remove(category);
  }
}
