import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Company } from "../../companies/entities/company.entity";
import { User } from "../../users/entities/user.entity";
import { RentalStatus } from "../../../common/enums/rental-status.enum";
import { RentalOrderItem } from "./rental-order-item.entity";

@Table({
    tableName: 'rental_orders',
    timestamps: true
})
export class RentalOrder extends Model {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    declare id: string

    @ForeignKey(() => Company)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare companyId: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare createdBy: string

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare startDate: Date

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare endDate: Date

    @Column({
        type: DataType.ENUM(...Object.values(RentalStatus)),
        defaultValue: RentalStatus.DRAFT
    })
    declare status: RentalStatus

    @Column({
        type: DataType.TEXT
    })
    declare notes: string

    @BelongsTo(() => Company)
    declare company: Company

    @BelongsTo(() => User)
    declare creator: User

    @HasMany(() => RentalOrderItem)
    declare items: RentalOrderItem[]
}
