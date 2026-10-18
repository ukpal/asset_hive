import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications.service";
import { OnEvent } from "@nestjs/event-emitter";
import { EVENTS } from "../../../common/events/event.constants";
import { RentalActivatedEvent } from "../../../common/events/payloads/rental-activated.event";

@Injectable()
export class RentalListener {

    constructor(
        private readonly notificationService: NotificationsService
    ) { }

    @OnEvent(EVENTS.RENTAL_ACTIVATED)
    async handleRentalActivated(payload: RentalActivatedEvent) {
        await this.notificationService.sendMail({
            recipient: payload.companyEmail,
            subject: 'Rental Activated',
            html: `
                <h2>Hello ${payload.companyName}</h2>

                <p>Your rental has been activated successfully</p>

                <p>Rental ID: <strong>${payload.rentalId}</strong></p>
            `
        });
    }

}