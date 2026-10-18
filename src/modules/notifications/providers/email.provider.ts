import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Resend } from "resend";
import { NotificationPayload } from "../interfaces/notification-payload.interface";

@Injectable()
export class EmailProvider {

    private readonly resend: Resend

    constructor(private readonly configService: ConfigService) {
        this.resend = new Resend(
            this.configService.get('RESEND_API_KEY')
        );
    }

    async send(payload: NotificationPayload) {
        await this.resend.emails.send({
            from: this.configService.get('EMAIL_FROM')!,

            to: payload.recipient,

            subject: payload.subject,

            html: payload.html
        });
    }
}