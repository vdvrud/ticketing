import { Publisher, OrderCreatedEvent, Subjects } from '@vdvrud/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
