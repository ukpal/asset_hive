import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RentalOrdersService } from './rental-orders.service';
import { CreateRentalOrderDto } from './dto/create-rental-order.dto';
import { UpdateRentalOrderDto } from './dto/update-rental-order.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/role.decorator';
import { UserRole } from '../../common/enums/user-role.enum';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('rental-orders')
export class RentalOrdersController {
  constructor(private readonly rentalOrdersService: RentalOrdersService) {}

  @Post()
  @Roles(UserRole.SUPER_ADMIN)
  @UseGuards(
    JwtAuthGuard,
    RolesGuard
  )
  create(@Body() createRentalOrderDto: CreateRentalOrderDto, @CurrentUser() user:any) {
    return this.rentalOrdersService.create(createRentalOrderDto,user);
  }

  @Get()
  findAll() {
    return this.rentalOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentalOrdersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRentalOrderDto: UpdateRentalOrderDto) {
    return this.rentalOrdersService.update(+id, updateRentalOrderDto);
  }

  @Patch(':id/activate')
  activateRental(@Param('id') id:string){
    return this.rentalOrdersService.activateRental(id);
  }

  @Patch(':id/return')
  returnRental(@Param('id') id:string){
    return this.rentalOrdersService.returnRental(id);
  }

  @Patch(':id/cancel')
  cancelRental(@Param('id') id:string){
    return this.rentalOrdersService.cancelRental(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rentalOrdersService.remove(+id);
  }
}
