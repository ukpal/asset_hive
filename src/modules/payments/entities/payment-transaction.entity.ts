import { Model, Table } from "sequelize-typescript";


@Table({
    tableName:'payment_transactions',
    timestamps:true
})
export class PaymentTransaction extends Model{

    id 

    invoiceId

    gateway

    gatewayOrderId

    gatewayPaymentId

    amount

    status 

    response
}