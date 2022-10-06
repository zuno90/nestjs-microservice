import { Injectable, Inject, Logger } from "@nestjs/common"
import { MailerService } from "@nestjs-modules/mailer"

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name)
    constructor(private readonly mailerService: MailerService) {}

    getHello(): string {
        return "Hello World from mail service!"
    }

    async sendMailOrdered(data: any) {
        this.logger.log("Order successfully, mail will be transfered to", data)
        console.log("data from mail service laaaa", data.user)
        // action to send mail
        await this.mailerService.sendMail({
            to: "pnlan1406@gmail.com", // change with data.user.email
            subject: "Mail test from nestjs",
            template: "./test",
            context: {
                name: "ZUNO",
                url: "https://tinhte.vn",
            },
        })
        // update status
    }
}
