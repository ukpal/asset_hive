import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../modules/users/entities/user.entity";
import { AdminSeeder } from "./seeders/admin.seeder";


@Module({
    imports:[
        SequelizeModule.forFeature([User])
    ],
    providers:[AdminSeeder],
    exports:[AdminSeeder]
})
export class DatabaseModule{}