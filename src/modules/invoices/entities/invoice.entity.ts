import { Column, DataType, Model, Table } from "sequelize-typescript";
import { InvoiceStatus } from "../../../common/enums/invoice-status.enum";

@Table({
    tableName: 'invoices',
    timestamps: true
})
export class Invoice extends Model {

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
        primaryKey: true
    })
    declare id: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    declare invoiceNumber: string

    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare companyId: string

    @Column({
        type: DataType.UUID,
        allowNull: false
    })
    declare rentalOrderId: string

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare issueDate: Date

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    declare dueDate: Date

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    declare totalAmount: number

    @Column({
        type: DataType.ENUM(...Object.values(InvoiceStatus)),
        defaultValue: InvoiceStatus.PENDING
    })
    declare status: InvoiceStatus
}
