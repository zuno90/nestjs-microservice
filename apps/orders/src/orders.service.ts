import { Injectable, Inject } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { lastValueFrom } from "rxjs"
import { BILLING_SERVICE_NAME, MAIL_SERVICE_NAME } from "./constants/services"
import { CreateOrderRequest } from "./dto/create-order.request"
import { OrderRepository } from "./order.repository"

@Injectable()
export class OrdersService {
    constructor(
        private readonly orderRepository: OrderRepository,
        @Inject(BILLING_SERVICE_NAME) private billingClient: ClientProxy,
        @Inject(MAIL_SERVICE_NAME) private mailClient: ClientProxy
    ) {}

    async getOrders() {
        try {
            const orders = await this.orderRepository.find({})
            return orders
        } catch (err) {
            throw err
        }
    }

    async getOrder(id: string) {
        try {
            const orders = await this.orderRepository.findOne({ id })
            return orders
        } catch (err) {
            throw err
        }
    }

    async createOrder(request: CreateOrderRequest, authentication: string) {
        const session = await this.orderRepository.startTransaction()
        try {
            const order = await this.orderRepository.create(request, { session })
            await Promise.all([
                lastValueFrom(this.billingClient.emit("order_created", { request, Authentication: authentication })),
                lastValueFrom(this.mailClient.emit("order_created", { request, Authentication: authentication })),
            ])
            await session.commitTransaction()
            return order
        } catch (err) {
            await session.abortTransaction()
            throw err
        }
    }
}
