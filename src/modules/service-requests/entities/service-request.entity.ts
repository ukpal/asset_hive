import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ServicePriority } from "../../../common/enums/service-priority.enum";
import { ServiceStatus } from "../../../common/enums/service-status.enum";
import { RentalOrder } from "../../rental-orders/entities/rental-order.entity";
import { Laptop } from "../../laptops/entities/laptop.entity";
import { Company } from "../../companies/entities/company.entity";
import { User } from "../../users/entities/user.entity";

@Table({
    tableName:'service_requests',
    timestamps:true
})
export class ServiceRequest extends Model {

    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
        primaryKey:true
    })
    declare id:string

    @ForeignKey(()=>RentalOrder)
    @Column({
        type:DataType.UUID,
        allowNull:false
    })
    declare rentalOrderId:string

    @ForeignKey(()=>Laptop)
    @Column({
        type:DataType.UUID,
        allowNull:false
    })
    declare laptopId:string

    @ForeignKey(()=>Company)
    @Column({
        type:DataType.UUID,
        allowNull:false
    })
    declare companyId:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare title:string

    @Column({
        type:DataType.TEXT
    })
    declare description:string

    @Column({
        type:DataType.ENUM(...Object.values(ServicePriority)),
        defaultValue:ServicePriority.LOW
    })
    declare priority:ServicePriority

    @Column({
        type:DataType.ENUM(...Object.values(ServiceStatus)),
        defaultValue:ServiceStatus.OPEN
    })
    declare status:ServiceStatus

    @ForeignKey(()=>User)
    @Column({
        type:DataType.UUID,
        allowNull:false
    })
    declare assignedTechnicianId:string

    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    declare resolvedAt:Date

}
