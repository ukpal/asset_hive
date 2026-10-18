import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRentalOrderDto } from './dto/create-rental-order.dto';
import { UpdateRentalOrderDto } from './dto/update-rental-order.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Company } from '../companies/entities/company.entity';
import { Laptop } from '../laptops/entities/laptop.entity';
import { LaptopStatus } from '../../common/enums/laptop-status.enum';
import { RentalOrder } from './entities/rental-order.entity';
import { RentalOrderItem } from './entities/rental-order-item.entity';
import { RentalStatus } from '../../common/enums/rental-status.enum';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from '../../common/events/event.constants';
import { RentalActivatedEvent } from '../../common/events/payloads/rental-activated.event';

@Injectable()
export class RentalOrdersService {

  constructor(
    @InjectModel(RentalOrder)
    private readonly rentalOrderModel: typeof RentalOrder,
    @InjectModel(RentalOrderItem)
    private readonly rentalOrderItemModel: typeof RentalOrderItem,
    @InjectModel(Company)
    private readonly companyModel: typeof Company,
    @InjectModel(Laptop)
    private readonly laptopModel: typeof Laptop,
    private readonly sequelize: Sequelize,
    private readonly eventEmitter:EventEmitter2
  ) { }

  async create(createRentalOrderDto: CreateRentalOrderDto, user) {

    const company = await this.validateCompany(createRentalOrderDto.companyId);
    const laptops = await this.validateLaptops(createRentalOrderDto.laptopIds);
    await this.validateDates(createRentalOrderDto.startDate, createRentalOrderDto.endDate);

    const rentalOrder = await this.rentalOrderModel.create({
      companyId: company.id,
      createdBy: user.id,
      startDate: createRentalOrderDto.startDate,
      endDate: createRentalOrderDto.endDate,
      notes: createRentalOrderDto.notes
    });

    const rentalOrderItems = laptops.map((laptop) => ({
      rentalOrderId: rentalOrder.id,
      laptopId: laptop.id,
      monthlyRentalPrice: laptop.monthlyRentalPrice
    }))

    await this.rentalOrderItemModel.bulkCreate(rentalOrderItems);

    return {
      orderId: rentalOrder.id
    }
  }

  findAll() {
    return `This action returns all rentalOrders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rentalOrder`;
  }

  update(id: number, updateRentalOrderDto: UpdateRentalOrderDto) {
    return `This action updates a #${id} rentalOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} rentalOrder`;
  }

  async activateRental(id: string) {

    const transaction = await this.sequelize.transaction();
    try {

      const rentalOrder = await this.rentalOrderModel.findByPk(id, { transaction });

      if (rentalOrder?.status !== RentalStatus.DRAFT)
        throw new BadRequestException('Something wrong with the order id')

      const orderItems = await this.rentalOrderItemModel.findAll({ where: { rentalOrderId: rentalOrder.id }, transaction });
      const laptopIds = orderItems.map(o => o.laptopId);

      const laptops = await this.laptopModel.findAll({
        where: {
          id: laptopIds
        },
        transaction
      })

      const unavailableLaptop = laptops.find(l => l.status !== LaptopStatus.AVAILABLE);

      if (unavailableLaptop)
        throw new BadRequestException(`Laptop ${unavailableLaptop.assetTag} is not available`);

      rentalOrder.status = RentalStatus.ACTIVE;
      await rentalOrder.save({ transaction });

      await this.laptopModel.update(
        { status: LaptopStatus.RENTED },
        {
          where: {
            id: {
              [Op.in]: laptopIds
            },
          },
          transaction
        },
      );

      await transaction.commit();

      this.eventEmitter.emit(
        EVENTS.RENTAL_ACTIVATED,
        new RentalActivatedEvent(
          rentalOrder.id,
          rentalOrder.createdBy,
          rentalOrder.companyId
        )
      );

      return "Order updated successfully"
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async returnRental(id: string) {
    const rentalOrder = await this.rentalOrderModel.findByPk(id);

    if (rentalOrder?.status !== RentalStatus.ACTIVE)
      throw new BadRequestException('Something wrong with the order id')

    const orderItems = await this.rentalOrderItemModel.findAll({ attributes: ['laptopId'], where: { rentalOrderId: rentalOrder.id } });
    const laptopIds = orderItems.map(o => o.laptopId);

    rentalOrder.status = RentalStatus.RETURNED;
    await rentalOrder.save();

    await this.laptopModel.update(
      { status: LaptopStatus.AVAILABLE },
      {
        where: {
          id: laptopIds,
        },
      },
    );

    return "Order updated successfully"
  }

  async cancelRental(id: string) {
    const rentalOrder = await this.rentalOrderModel.findByPk(id);

    if (rentalOrder?.status !== RentalStatus.DRAFT)
      throw new BadRequestException('This order can not be cancelled')

    rentalOrder.status = RentalStatus.CANCELLED;
    await rentalOrder.save();

    return "Order updated successfully"
  }

  private async validateCompany(companyId: string) {
    const company = await this.companyModel.findByPk(companyId);

    if (!company) throw new BadRequestException('Company not found');

    return company;
  }

  private async validateLaptops(laptopIds: string[]) {
    const uniqueIds = new Set(laptopIds);

    if (uniqueIds.size !== laptopIds.length)
      throw new BadRequestException('Duplicate laptop IDs are not allowed');

    const laptops = await this.laptopModel.findAll({
      where: {
        id: laptopIds
      }
    })

    if (laptops.length !== laptopIds.length)
      throw new BadRequestException('One or more laptops do not exists');

    const unavailableLaptop = laptops.find(l => l.status !== LaptopStatus.AVAILABLE);

    if (unavailableLaptop)
      throw new BadRequestException(`Laptop ${unavailableLaptop.assetTag} is not available`);

    return laptops;
  }

  private async validateDates(startDate: Date, endDate: Date) {

    if (new Date(endDate) <= new Date(startDate))
      throw new BadRequestException("End date must be after start date")

  }
}
