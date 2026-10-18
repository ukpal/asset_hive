
export class RentalActivatedEvent {
    constructor(
        public readonly rentalId: string,
        public readonly companyEmail: string,
        public readonly companyName: string
    ) { }
}