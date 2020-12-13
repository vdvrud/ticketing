import { Publisher, Subjects, TicketCreatedEvent } from '@vdvrud/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
