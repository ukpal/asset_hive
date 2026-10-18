import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Invoice } from "../../invoices/entities/invoice.entity";

@Table({
    tableName:'payments',
    timestamps:true
})
export class Payment extends Model {

    @Column({
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
        primaryKey:true
    })
    declare id:string

    @ForeignKey(()=>Invoice)
    @Column({
        type:DataType.UUID,
        allowNull:false
    })
    declare invoiceId:string

    amount

    paymentMethod

    // referenceNumber

    paymentDate

    notes
}
