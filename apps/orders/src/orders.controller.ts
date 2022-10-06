import { JwtAuthGuard } from "@app/common"
import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common"
import { Request } from "express"
import { CreateOrderRequest } from "./dto/create-order.request"
import { OrdersService } from "./orders.service"

@Controller()
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get("orders")
    @UseGuards(JwtAuthGuard)
    getOrders() {
        return this.ordersService.getOrders()
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    createOrder(@Body() request: CreateOrderRequest, @Req() req: Request) {
        return this.ordersService.createOrder(request, req.cookies?.Authentication)
    }
}
