import { UsersService } from './../users/users.service';
import { UsersController } from './../users/users.controller';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { arrayUnique } from 'class-validator';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private templateRepository: Repository<Template>,
    private readonly usersService:UsersService,
  ) {}

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const {userId} = createTemplateDto
    const user = await this.usersService.findOne(userId)
    if(!user){
      throw new BadRequestException({message:"Bunday User Id Mavjud Emas"})
    }

    const newTemplate = this.templateRepository.create({...createTemplateDto, user});
    return await this.templateRepository.save(newTemplate);
  }

  async findAll(): Promise<Template[]> {
    return await this.templateRepository.find({relations:["user"]});
  }

  async findOne(id: number): Promise<Template> {
    const template = await this.templateRepository.findOneBy({ id });
    if (!template) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
    return template;
  }

  async update(id: number, updateTemplateDto: UpdateTemplateDto){
  const template = await this.templateRepository.findOne({where:{id}})
    if(!template){
      throw new BadRequestException({message:"Bunday Id Malumot Mavjud emas"})
    }
    const {userId,...res} = updateTemplateDto
    const user = await this.usersService.findOne(userId!)
    if(!user){
      throw new BadRequestException({message:"Bunday User Id mavjud emas"})
    }
    return this.templateRepository.update(id, {
      user,
      ...res
    })
  }

  async remove(id: number): Promise<void> {
    const result = await this.templateRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Template with ID ${id} not found`);
    }
  }
}
