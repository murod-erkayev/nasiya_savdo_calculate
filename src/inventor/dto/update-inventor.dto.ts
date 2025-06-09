import { PartialType } from '@nestjs/mapped-types';
import { CreateInventorDto } from './create-inventor.dto';

export class UpdateInventorDto extends PartialType(CreateInventorDto) {}
