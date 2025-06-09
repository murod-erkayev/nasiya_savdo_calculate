import { Template } from './../templates/entities/template.entity';
import { Customer } from './../customer/entities/customer.entity';
import { CustomerService } from './../customer/customer.service';
import { TemplatesService } from './../templates/templates.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { transcode } from 'buffer';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private readonly templatesService:TemplatesService,
    private readonly customerService:CustomerService,
  ) {}
  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const {customerId, templateId} = createNotificationDto
    const customer = await this.customerService.findOne(customerId)
    if(!customer){
      throw new BadRequestException({message:"Bunday Cusotmer Id Malumotlari mavjud emas"})
    }
    const template = await this.templatesService.findOne(templateId)
    if(!template){
      throw new BadRequestException({message:"Bunday Template Id Malumotlari mavjud emas"})
    }
    const newNotification = this.notificationRepository.create({...createNotificationDto, customer, template});
    return await this.notificationRepository.save(newNotification);
  }
  async findAll(): Promise<Notification[]> {
    return await this.notificationRepository.find({relations:["template", "customer"]});
  }
  async findOne(id: number): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({where:{id},relations:["template", "customer"]})
    if (!notification) {
      throw new NotFoundException(`ID ${id} bo‘yicha xabar topilmadi`);
    }
    return notification;
  }
  async update(id: number, updateNotificationDto: UpdateNotificationDto) {
    const notification = await this.notificationRepository.findOne({where:{id}})
    if(!notification){
      throw new BadRequestException({message:"Bunday Natifaction Id Mavjud emas"})
    }
    const {templateId, customerId, ...res} = updateNotificationDto
    const template = await this.templatesService.findOne(templateId!)
    if(!template){
      throw new  BadRequestException({message:"Bunday Template Id Mavjud emas"})
    }
    const customer = await this.customerService.findOne(customerId!)
    if(!customer){
      throw new BadRequestException({message:"Bunday Cusotmer Id mavjud emas"})
    }
    return this.notificationRepository.update(id, {
      template,
      customer,
      ...res
    })

  }
  async remove(id: number): Promise<void> {
    const result = await this.notificationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ID ${id} bo‘yicha xabar topilmadi`);
    }
  }
}
