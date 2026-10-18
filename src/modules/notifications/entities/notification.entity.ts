import { Model, Table } from "sequelize-typescript";

@Table({
    tableName:'notifications',
    timestamps:true
})
export class Notification extends Model{

    id 

    userId 

    title

    message

    type

    isRead
}