import { JwtAuthGuard } from "@app/common"
import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common"
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

    @Get("order/:id")
    @UseGuards(JwtAuthGuard)
    getOrder(@Param("id") id: string) {
        return this.ordersService.getOrder(id)
    }

    @Post("order")
    @UseGuards(JwtAuthGuard)
    createOrder(@Body() request: CreateOrderRequest, @Req() req: Request) {
        return this.ordersService.createOrder(request, req.cookies?.Authentication)
    }
}
