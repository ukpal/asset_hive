import { Model, Table } from "sequelize-typescript";

@Table({
    tableName:'audit_logs',
    timestamps:true
})
export class AuditLog extends Model {

    id 

    userId 

    action 

    entityType

    entityId

    metaData
}
