import { Injectable, Inject } from "@nestjs/common"
import { ClientProxy } from "@nestjs/microservices"
import { lastValueFrom } from "rxjs"
import { BILLING_SERVICE_NAME } from "./constants/services"
import { CreateOrderRequest } from "./dto/create-order.request"
import { OrderRepository } from "./order.repository"

@Injectable()
export class OrdersService {
    constructor(
        private readonly orderRepository: OrderRepository,
        @Inject(BILLING_SERVICE_NAME) private billingClient: ClientProxy
    ) {}
    getHello(): string {
        return "Hello World from Order service!"
    }
    async createOrder(request: CreateOrderRequest, authentication: string) {
        const session = await this.orderRepository.startTransaction()
        try {
            const order = await this.orderRepository.create(request, { session })
            await lastValueFrom(this.billingClient.emit("order_created", { request, Authentication: authentication }))
            await session.commitTransaction()
            return order
        } catch (err) {
            await session.abortTransaction()
            throw err
        }
    }
}
