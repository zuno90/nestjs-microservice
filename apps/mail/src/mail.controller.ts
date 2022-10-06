import { JwtAuthGuard, RmqService } from "@app/common"
import { Controller, Get, UseGuards } from "@nestjs/common"
import { Ctx, EventPattern, Payload, RmqContext } from "@nestjs/microservices"
import { MailService } from "./mail.service"

@Controller("mail")
export class MailController {
    constructor(private readonly mailService: MailService, private readonly rmqService: RmqService) {}

    @Get()
    getHello(): string {
        return this.mailService.getHello()
    }

    @EventPattern("order_created")
    @UseGuards(JwtAuthGuard)
    async handleOrderCreated(@Payload() data: any, @Ctx() context: RmqContext) {
        this.mailService.sendMailOrdered(data)
        this.rmqService.ack(context)
    }
}
