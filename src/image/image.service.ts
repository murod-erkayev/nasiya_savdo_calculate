import { Injectable } from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImageService {
  constructor(@InjectRepository(Image) private readonly imageRepo:Repository<Image>) {}
  async create(createImageDto: CreateImageDto) {
    return this.imageRepo.save(createImageDto)
  }
  findAll() {
    return `This action returns all image`;
  }

  findOne(id: number) {
    return this.imageRepo.findOne({where:{id}})
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
