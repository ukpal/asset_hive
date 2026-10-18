import { Module,OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { AuthModule } from './modules/auth/auth.module';
import { EventEmitterModule } from "@nestjs/event-emitter";

import configuration from "./config/configuration"
import { DatabaseModule } from './database/database.module';
import { AdminSeeder } from './database/seeders/admin.seeder';
import { LaptopsModule } from './modules/laptops/laptops.module';
import { RentalOrdersModule } from './modules/rental-orders/rental-orders.module';
import { ServiceRequestsModule } from './modules/service-requests/service-requests.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'postgres',
        host: config.get('database.host'),
        port: config.get('database.port'),
        database: config.get('database.name'),
        username: config.get('database.username'),
        password: config.get('database.password'),

        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    EventEmitterModule.forRoot(),
    UsersModule,
    CompaniesModule,
    AuthModule,
    DatabaseModule,
    LaptopsModule,
    RentalOrdersModule,
    ServiceRequestsModule,
    InvoicesModule,
    PaymentsModule,
    AuditLogsModule,
    DashboardModule,
    NotificationsModule,
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit { 

  constructor(
    private readonly adminSeeder:AdminSeeder
  ){}

  async onModuleInit() {
    await this.adminSeeder.seed();
  }
}
