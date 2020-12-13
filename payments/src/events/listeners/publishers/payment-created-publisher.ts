import { PaymentCreatedEvent, Publisher, Subjects } from "@vdvrud/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

    
}