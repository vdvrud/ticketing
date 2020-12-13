import { Subjects, Publisher, OrderCancelledEvent } from '@vdvrud/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
