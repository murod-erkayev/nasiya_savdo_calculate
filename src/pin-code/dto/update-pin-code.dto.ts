import { PartialType } from '@nestjs/mapped-types';
import { CreatePinCodeDto } from './create-pin-code.dto';

export class UpdatePinCodeDto extends PartialType(CreatePinCodeDto) {}
