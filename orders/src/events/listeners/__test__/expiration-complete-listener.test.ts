import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper"
import { ExpirationCompleteListener } from "../expiration-complete-listener";
import mongoose from 'mongoose';
import { Order, OrderStatus } from "../../../models/order";
import { ExpirationCompleteEvent } from "@vdvrud/common";
import { Message } from "node-nats-streaming";

const setup = async () => {
    const listener = new ExpirationCompleteListener(natsWrapper.client);

    const ticket = Ticket.build({
        id: mongoose.Types.ObjectId().toHexString(),
        title: 'vdv',
        price: 868
    });
    await ticket.save();

    const order = Order.build({
        status: OrderStatus.Cancelled,
        userId: 'df98i',
        expiresAt: new Date(),
        ticket
    });

    await order.save();

    const data: ExpirationCompleteEvent['data'] = {
        orderId: order.id
    };
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, order, ticket, data, msg }
}

it('updates the order status to cancelled', async() => {
    const { listener, order, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedOrder = await Order.findById(order.id);

    expect(updatedOrder?.status).toEqual(OrderStatus.Cancelled);
});

it('emits an ordercancelled event', async() => {
    const { listener, order, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled()

    const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

    expect(eventData.id).toEqual(order.id);
});

it('acks the message', async() => {
    const { listener, order, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled()
})