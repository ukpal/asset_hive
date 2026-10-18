import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { EmailProvider } from './providers/email.provider';
import { RentalListener } from './listeners/rental.listener';

@Module({
  providers: [
    NotificationsService,
    EmailProvider,
    RentalListener
  ]
})
export class NotificationsModule {}
