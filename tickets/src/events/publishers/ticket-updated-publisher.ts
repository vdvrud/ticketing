import { Publisher, Subjects, TicketUpdatedEvent } from '@vdvrud/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
