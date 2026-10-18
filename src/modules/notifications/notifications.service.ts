import { Injectable } from '@nestjs/common';
import { EmailProvider } from './providers/email.provider';
import { NotificationPayload } from './interfaces/notification-payload.interface';

@Injectable()
export class NotificationsService {

    constructor(
        private readonly emailProvider: EmailProvider
    ) { }

    async sendMail(payload: NotificationPayload) {
        await this.emailProvider.send(payload);
    }
}
