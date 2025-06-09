import { PartialType } from '@nestjs/mapped-types';
import { CreatePruductDto } from './create-pruduct.dto';

export class UpdatePruductDto extends PartialType(CreatePruductDto) {}
