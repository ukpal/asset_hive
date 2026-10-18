import { PartialType } from '@nestjs/swagger';
import { CreateRentalOrderDto } from './create-rental-order.dto';

export class UpdateRentalOrderDto extends PartialType(CreateRentalOrderDto) {}
