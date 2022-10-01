import { Injectable, Logger } from "@nestjs/common"
import { MailerService } from "@nestjs-modules/mailer"

@Injectable()
export class MailService {
    constructor(
        private readonly logger = new Logger(MailService.name),
        private readonly mailerService: MailerService
    ) {}

    getHello(): string {
        return "Hello World from mail service!"
    }

    async sendMailOrdered(data: any) {
        this.logger.log("Order successfully, mail will be transfered to", data)
        console.log("data from mail service", data.user)
        console.log("hello")
        // action to send mail
        await this.mailerService.sendMail({
            to: "pnlan1406@gmail.com", // change with data.user.email
            from: "pnlan1406@gmail.com",
            subject: "Mail test from nestjs",
            template: __dirname + "/templates",
            context: {
                name: "ZUNO",
                url: "https://tinhte.vn",
            },
        })

        return {
            success: true,
            msg: `Email is sent to pnlan1406@gmail.com`,
        }
    }
}
