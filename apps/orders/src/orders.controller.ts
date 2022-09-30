import { JwtAuthGuard } from "@app/common"
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { Request } from "express"
import { CreateOrderRequest } from "./dto/create-order.request"
import { OrdersService } from "./orders.service"

@Controller("orders")
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    getHello(): string {
        return this.ordersService.getHello()
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createOrder(@Body() request: CreateOrderRequest, @Req() req: Request) {
        return this.ordersService.createOrder(request, req.cookies?.Authentication)
    }
}
