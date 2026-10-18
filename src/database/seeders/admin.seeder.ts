import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../../modules/users/entities/user.entity";
import { UserRole } from "../../common/enums/user-role.enum";
import * as bcrypt from "bcrypt"
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AdminSeeder {

    constructor(
        @InjectModel(User)
        private readonly userModel: typeof User,
        private readonly config: ConfigService
    ) { }

    async seed() {

        const existingAdmin = await this.userModel.findOne({
            where: {
                email: 'admin@assethive.com'
            }
        })

        if (existingAdmin) {
            console.log('Super admin already exists');
            return;
        }

        const hashedPassword =await bcrypt.hash(this.config.get('admin.password')!, 10);

        await this.userModel.create({
            name: this.config.get('admin.name'),
            email: this.config.get("admin.email"),
            password: hashedPassword,
            role: UserRole.SUPER_ADMIN,
            isActive: true
        });

        console.log('Super admin created successfully');

    }
}